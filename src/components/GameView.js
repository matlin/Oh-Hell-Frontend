import React, {Component} from 'react';
import styled from 'styled-components';
import Server from '../server.js';
import '../gameview.css';
import '../cards.css';
import io from 'socket.io-client';
import {
  Button,
} from 'react-bootstrap';

class GameView extends Component{
  constructor(props){
    super(props);
    this.state = {
      gameState: {joined: false, hand: []},
      messages: null,
      id: props.gameID,
      username: props.username,
      server: new Server.Game(props.gameID, this.stateCallback.bind(this))
    }
  }

  componentDidMount(){
      console.log('Game view mounted');
      this.loadGame();
      const socket = io('http://localhost:4001');
      socket.emit('join', this.state.id);
      socket.on('update', (data) => {
        this.socketCallback(data);
      });
  }

  componentWillUnmount(){
    console.log('Game view unmounting');
  }


  loadGame(){
    if (this.state.id){
      this.state.server.get();
    }else{
      console.error('No game id provided');
    }
  }

  socketCallback = (response) => {
    //TODO add check for game id
    this.loadGame();
  }

  stateCallback (response){
    console.log("Http response: ", response);
    if (response.alert){
      window.alert(response.alert);
    }
    if (response.state){
        this.setState({gameState: response.state});
    }
    if (response.message){
      this.setState({messages: response.message.concat(this.state.messages)});
    }
  }


  render(){
    console.log('rendering from', this.state.gameState);
    if (this.state.gameState.joined === false){
      console.log('joined?', this.state.gameState.joined);
      return (
        <div>
          <p>You have not joined this game. Join?</p>
          <input type="button" value="Join" onClick={() => {
              this.state.server.join();
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
              this.state.server.start(this.state.id);
            }
          }
          />
        </div>
      );
    }
    return(
      <GameTable server={this.state.server} state={this.state.gameState} username={this.state.username} />
    );
  }
}

export default GameView;

function Opponent (props){
  let name = props.name;
  let bets = props.state.state.bets[name];
  let tricks = props.state.state.tricks[name] || 0;
  let color = (props.turn ? 'red' : 'white');
  let PlayerInfo = styled.div`
    display:inline-block;
    float:left;
    margin-right:10px;
    text-align:left;
  `;
  return (
    <div style={{"backgroundColor": color}} className="opponent">
      <h4>{name}</h4><hr />
      <PlayerInfo>
        <span>Bet: {bets}</span><br />
        <span>Tricks: {tricks}</span>
      </PlayerInfo>
       {(() => {
          if (props.card){
            return (
              <div style={{"float":"right"}} className="playingCards">
                <Card code={props.card.id} />
              </div>
            );
          }
        })()}
    </div>
  );
}

function Card(props){
  let sizeClass = props.small ? 'inText' : 'simpleCards';
  let code = props.code;
  let rank = code.substring(0, code.length == 2 ? 1 : 2);
  let suit = code[code.length == 2 ? 1 : 2];
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
  console.log("Rendering gametable", props);
  //let players = props.state.players.filter(username => username !== props.username);
  let players = [1,2,3,4,5,6];
  let dist = threeDistribution(players);
  let containers = [];
  for (let i=0; i<dist.length; i++){
    containers[i] = [];
    for (let j=0; j<dist[i]; j++){
      let player = players.shift();
      const turn = props.state.turn === player;
      containers[i].push(<Opponent key={player} turn={turn} state={props} card={props.state.cardsInPlay[player]} name={player} />);
    }
  }
  let color = (props.state.turn === props.username ? 'red' : 'none');
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
      <div id="hand" style={{"backgroundColor": "white"}} className="playingCards">
        <h3>{props.username}</h3>
        <BetMaker betFunc={props.server.bet} bet={props.state.bets[props.username]} show={props.state.betting} maxBet={props.state.hand.length} />
        <Hand play={(cardID) => {props.server.playCard(cardID)}} state={props} cards={props.state.hand.map(card => card.id)} />
      </div>
    </div>
  );
}

function BetMaker(props){
  if (props.show === true){
    let betButtons = [];
    for (let i=0; i<=props.maxBet; i++){
      const haveBet = props.bet != null;
      const style = props.bet === i ? "success" : "default";
      betButtons.push(
        //<Button type="button" key={"bet" + i} disabled={haveBet} style={{"backgroundColor": color}} onClick={() => {props.betFunc(i)}} value={i} />
        <Button bsSize="xs" bsStyle={style} onClick={() => {props.betFunc(i)}} disabled={haveBet} key={"bet" + i}>{i}</Button>
      );
    }
    return(
      <div>Click to bet: {betButtons}</div>
    );
  }else{
    return null;
  }
}

function Hand(props){
  console.log(props);
  const gameID = (props.state.state.id);
  let cards = props.cards.map((card)=>{
    return (<li key={card}  onClick={()=> props.play(card)}> <Card code={card} /> </li>);
  });
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
