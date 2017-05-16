import React, { Component } from "react";
import styled from "styled-components";
import Server from "../server.js";
import "../gameview.css";
import "../cards.css";
import PregameView from "./PregameView.js";
import io from "socket.io-client";
import {
  Button,
} from 'react-bootstrap';


class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: {},
      messages: null,
      id: props.gameID,
      username: props.username,
      server: new Server.Game(props.gameID, this.stateCallback.bind(this)),
      loading: true
    };
  }


  componentDidMount() {
    console.log("Game view mounted");
    this.loadGame();
    const socket = io("http://localhost:4001");
    socket.emit("join", this.state.id);
    socket.on("update", data => {
      this.socketCallback(data);
    });
  }

  componentWillUnmount() {
    console.log("Game view unmounting");
  }

  loadGame() {
    if (this.state.id) {
      this.state.server.get();
    }else{
      console.error('No game id provided');
    }
  }

  socketCallback = (response) => {
    //TODO add check for game id
    this.loadGame();
  }


  stateCallback(response) {
    console.log("Http response: ", response);
    if (response.alert) {
      window.alert(response.alert);
    }
    if (response.state && response.message) {
      this.setState({
        gameState: response.state,
        messages: response.message.concat(this.state.messages),
        loading: false
      });
      return;
    }
    if (response.state) {
      this.setState({ gameState: response.state, loading: false });
      return;
    }
  }

  render() {
    console.log("rendering from", this.state.gameState);
    if (this.state.loading === true) {
      return <p>Loading game...</p>;
    }
    if (
      this.state.gameState.joined === false ||
      this.state.gameState.started === false
    ) {
      console.log("joined?", this.state.gameState.joined);
      return (
        <PregameView
          maxPlayers={this.state.gameState.maxPlayers}
          minPlayers={this.state.gameState.minPlayers}
          players={this.state.gameState.players}
          gameName={this.state.gameState.gameName}
          hasPassword={this.state.gameState.hasPassword}
          joined={this.state.gameState.joined}
          isOwner={this.state.gameState.isOwner}
          join={password => {
            this.state.server.join(password);
          }}
          start={() => this.state.server.start(this.state.id)}
        />
      );
    }
    return (
      <GameTable
        server={this.state.server}
        state={this.state.gameState}
        username={this.state.username}
      />
    );
  }
}

export default GameView;

function Opponent(props) {
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
  let scoreSum = 0;
  for (let i = 0; i < Object.keys(props.state.state.scores.round).length; i++) {
    scoreSum += Object.values(props.state.state.scores.round)[i][name];
  }
  return (
    <div className="opponent">
      <h4>{name}</h4><hr />

      <span>Bet: {bets}</span><br />
      <span>Tricks: {tricks}</span><br />
      <span>Score: {scoreSum}</span>
      <div className="playingCards inText">
        {(() => {
          if (props.card) {
            //console.log(name, " played ", props.card)
            return <Card code={props.card.id} />;
          }
        })()}
      </div>
    </div>
  );
}

function Card(props) {
  let sizeClass = props.small ? "inText" : "simpleCards";
  let code = props.code;
  let rank;
  if(props.code.id){
    rank = props.code.id.slice(0,props.code.length-1);
  } else{
    rank = code.substring(0, code.length == 2 ? 1 : 2);
  }
  console.log(rank);
  let suit = code[code.length == 2 ? 1 : 2];
  const suitMap = { D: "diams", H: "hearts", S: "spades", C: "clubs" };
  const charMap = { D: "9830", H: "9829", S: "9824", C: "9827" };
  let suitClass = suitMap[suit];
  return (
    //<div className={"playingCards " + sizeClass}>
    (
      <div className={`card rank-${rank} ${suitClass}`}>
        <span className="rank">{rank}</span>
        <span className="suit">{String.fromCharCode(charMap[suit])}</span>
      </div>
    )
    //</div>
  );
}
class MessageTicker extends Component {
  constructor(props){
    super(props);
  }
  componentDidUpdate(){
    console.log("message window", this.scrollWindow);
    this.scrollWindow.scrollTop = this.scrollWindow.scrollHeight;
  }
  render(){
    const MessageDiv = styled.div`
      position: absolute;
      bottom: 0px;
      right: 0px;
      width:100%;
      max-height:90px;
      overflow:hidden;
    `;
    const MessageWindow = styled.div`
      overflow-y:scroll;
      box-shadow: inset 0 7px 10px 0px rgba(0,0,0,0.4);
      color:white;
      opacity: 0.7;
      max-height:65px;
      padding: 15px;
    `;
    let messages = this.props.messages.map(message => <p>{message}</p>);
    return (
      <MessageDiv>
        <h5>Messages</h5>
        <MessageWindow innerRef={(scrollWindow) => { this.scrollWindow = scrollWindow;}}>
          {messages}
        </MessageWindow>
      </MessageDiv>
    );
  }
}

function GameTable(props) {
  console.log("Rendering gametable", props);
  let players = props.state.players.filter(
    username => username !== props.username
  );
  let dist = threeDistribution(players);
  let containers = [];
  for (let i = 0; i < dist.length; i++) {
    containers[i] = [];
    for (let j = 0; j < dist[i]; j++) {
      let player = players.shift();
      const turn = props.state.turn === player;
      containers[i].push(<Opponent key={player} turn={turn} state={props} card={props.state.cardsInPlay[player]} name={player} />);
    }
  }
  // self view components
  let scoreSum = 0;
  for (let i = 0; i < Object.keys(props.state.scores.round).length; i++) {
    scoreSum += Object.values(props.state.scores.round)[i][props.username];
  }
  let bets = props.state.bets[props.username];
  let tricks = props.state.tricks[props.username] || 0;

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
          <MessageTicker messages={props.state.messages} />
      </div>
      <div id="hand" className="playingCards">
        <h3>{props.username}</h3>
        <div>
          <p>Bet: {bets}</p>
          <p>Tricks: {tricks}</p>
          <p>Score: {scoreSum}</p>
        </div>
        <BetMaker betFunc={props.server.bet} bet={props.state.bets[props.username]} show={props.state.betting} maxBet={props.state.hand.length} />
        <Hand play={(cardID) => {props.server.playCard(cardID)}} state={props} cards={props.state.hand.map(card => card.id)} />
      </div>
    </div>
  );
}

function BetMaker(props) {
  if (props.show === true) {
    let betButtons = [];
    for (let i=0; i<=props.maxBet; i++){
      const haveBet = props.bet != null;
      const style = props.bet === i ? "success" : "default";
      betButtons.push(
        //<Button type="button" key={"bet" + i} disabled={haveBet} style={{"backgroundColor": color}} onClick={() => {props.betFunc(i)}} value={i} />
        <Button bsSize="xs" bsStyle={style} onClick={() => {props.betFunc(i)}} disabled={haveBet} key={"bet" + i}>{i}</Button>
      );
    }
    return <div>Click to bet: {betButtons}</div>;
  } else {
    return null;
  }
}

function Hand(props) {
  console.log(props);
  const gameID = props.state.state.id;
  let cards = props.cards.map(card => {
    return (
      <li key={card} onClick={() => props.play(card)}>
        {" "}<Card code={card} />{" "}
      </li>
    );
  });
  return (
    <ul className="hand">
      {cards}
    </ul>
  );
}


function threeDistribution(listorlength){
  let length, result, dist;
  if (Array.isArray(listorlength)) {
    length = listorlength.length;
  } else {
    length = listorlength;
  }
  switch (length % 3) {
    case 0:
      dist = length / 3;
      result = [dist, dist, dist];
      break;
    case 1:
      dist = (length - 1) / 3;
      result = [dist, dist + 1, dist];
      break;
    case 2:
      dist = (length - 2) / 3;
      result = [dist + 1, dist, dist + 1];
      break;
    default:
      console.error("Uh oh");
  }
  return result;
}
