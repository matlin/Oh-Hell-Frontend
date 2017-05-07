import React, {Component} from 'react';
import styled from 'styled-components';
import Server from '../server.js';
import '../gameview.css';
import '../cards.css';

class GameView extends Component{
  constructor(props){
    super(props);
    this.state = {
      gameState: {joined: false},
      messages: null,
      id: props.match.params.id,
    }
    console.log('GameView loaded');
    this.loadGame();
  }

  loadGame(){
    if (this.state.id){
      Server.game.get(this.state.id).then(response => {
        this.setState({gameState: response.state});
        if (response.messsage){
            window.alert(response.message);
        }
      })
    }else{
      console.error('No game id provided');
    }
  }

  stateCallback(response){
    console.log(response);
    this.setState({gameState: response.state, messages:response.message});
    if (response.message){
      //window.alert(response.message);
    }
  }


  render(){
    console.log('Joined: ' + this.state.gameState.joined);
    if (this.state.gameState.joined === false){
      return (
        <div>
          <p>You have not joined this game. Join?</p>
          <input type="button" value="Join" onClick={() => {
              Server.game.join(this.state.id).then((response) => {this.stateCallback(response)});
            }
          }
          />
        </div>
      );
    }
    if (this.state.gameState.started === false){
      return (
        <div>
          <p>This game has not started yet.</p>
          <input type="button" value="Start" onClick={() => {
              Server.game.start(this.state.id).then((response) => {this.stateCallback(response)});
            }
          }
          />
        </div>
      );
    }
    console.log('Rendering game table');
    return(
      <GameTable state={this.state.gameState} />
    );
  }
}

export default GameView;

function Opponent (props){
  let name = props.name;
  return (
    <div className="opponent">
      <h4>{name}</h4><hr />
      <span>Bet: {Math.floor(Math.random() * 4)}</span><br />
      <span>Tricks: {Math.floor(Math.random() * 4)}</span>
      <div className="playingCards inText">
       {(() => {
          if (props.card){
            return <Card code={props.card} />;
          }
        })()}
      </div>
    </div>
  );
}

function Card(props){
  let sizeClass = props.small ? 'inText' : 'simpleCards';
  let code = props.code;
  let rank = code[0];
  let suit = code[1];
  const suitMap = {D: 'diams',H: 'hearts',S: 'spades',C: 'clubs'}
  const charMap = {D: '9830',H: '9829',S: '9824',C: '9827'}
  let suitClass = suitMap[suit];
  return (
    //<div className={"playingCards " + sizeClass}>
      <div className={`card rank-${rank} ${suitClass}`}>
          <span className="rank">{rank}</span>
          <span className="suit">{String.fromCharCode(charMap[suit])}</span>
      </div>
    //</div>
  );
}

function GameTable (props){
  console.log(props);
  let players = props.state.players.filter(username => username !== props.state.user);
  let dist = threeDistribution(players);
  let containers = [];
  for (let i=0; i<dist.length; i++){
    containers[i] = [];
    for (let j=0; j<dist[i]; j++){
      let player = players.shift();
      containers[i].push(<Opponent card={props.state.cardsInPlay[player]} name={player} />);
    }
  }
  return (
    <div id="grid">
      <div id="left-table">{containers[0]}</div>
      <div id="top-table">{containers[1]}</div>
      <div id="right-table">{containers[2]}</div>
      <div id="table">
        <h3>Oh Hell</h3>
        <div className="playingCards inText">Trump: <Card code={props.state.trumpCard.id} /></div>
        <p>Turn: {props.state.turn}</p>
        <p>Dealer: {props.state.dealer}</p>
      </div>
      <div id="hand" className="playingCards">
        <BetMaker bet={Server.game.bet.bind(this, props.state.id)} show={props.state.betting} maxBet={props.state.hand.length} />
        <Hand state={props} cards={props.state.hand.map(card => card.id)} />
      </div>
    </div>
  );
}

function BetMaker(props){
  if (props.show === true){
    let betButtons = [];
    for (let i=0; i<=props.maxBet; i++){
      betButtons.push(<input type="button" key={"bet" + i} onClick={() => {props.bet(i) ;}} value={i} />);
    }
    return(
      <div>Click to bet: {betButtons}</div>
    );
  }else{
    return null;
  }
}

function playCard(card, gameID){
  console.log("Trying to play", card);
  console.log(gameID);
  Server.game.playCard(gameID, card).then(response => {
    console.log(response);
    this.setState({gameState: response.state, messages:response.message});
    if (response.message){
      window.alert(response.message);
      //this.loadGame();
    }
  })
}

function Hand(props){
  const gameID = (props.state.state.id);
  let cards = props.cards.map((card)=>{
    return (<li onClick={()=>playCard(card, gameID)}> <Card code={card} key={card}Card /> </li>);
  });
  console.log(cards);
  return (
    <ul className="hand">
       {cards}
     </ul>
  );
}




function threeDistribution(listorlength){
  let length, result, dist;
  if (Array.isArray(listorlength)){
    length = listorlength.length;
  }else{
    length = listorlength;
  }
  switch((length % 3)){
    case 0:
      dist = length / 3;
      result = [dist, dist, dist];
      break;
    case 1:
      dist = (length - 1) / 3;
      result = [dist, dist+1, dist];
      break;
    case 2:
      dist = (length - 2) / 3;
      result = [dist+1, dist, dist+1];
      break;
    default:
      console.error('Uh oh');
  }
  return result;
}




/*ReactDOM.render(
  <GameView left={containers[0]} top={containers[1]} right={containers[2]} />,
  document.getElementById('root')
);*/
