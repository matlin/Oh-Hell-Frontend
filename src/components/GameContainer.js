import React, { Component } from 'react';

import Card from './Card.js';
import Betting from './Betting.js';
import Opponent from './Opponent.js';
import Player from './Player.js';
import Scoreboard from './Scoreboard.js';

import '../App.css';

//NOTE: assuming that the absolute max amount of players is 8

class GameContainer extends Component{
  constructor(){
    super();

    //following is sample state
    let testCardA = {};
    testCardA['suit'] = 'Diamonds';
    testCardA['value'] = '2';

    let testCardB = {};
    testCardB['suit'] = 'Diamonds';
    testCardB['value'] = '3';

    let testCardC = {};
    testCardC['suit'] = 'Clubs';
    testCardC['value'] = 'A';

    let testCardD = {};
    testCardD['suit'] = 'Hearts';
    testCardD['value'] = '10';

    let testCardE = {};
    testCardE['suit'] = 'Diamonds';
    testCardE['value'] = '8';

    let testCardF = {};
    testCardF['suit'] = 'Spades';
    testCardF['value'] = '4';

    let testCardG = {};
    testCardG['suit'] = 'Clubs';
    testCardG['value'] = 'K';

    let testCardH = {};
    testCardH['suit'] = 'Hearts';
    testCardH['value'] = '7';

    let playerA = {}; let playerB = {}; let playerC = {}; let playerD = {};
    let playerE = {}; let playerF = {}; let playerG = {}; let playerH = {};

    playerA['_id'] = "Pikachu"; //assuming _id is a unique username
    playerB['_id'] = "Charmander";
    playerC['_id'] = "Squirtle";
    playerD['_id'] = "Mimikyu";
    playerE['_id'] = "Meowth"; //assuming _id is a unique username
    playerF['_id'] = "Misty";
    playerG['_id'] = "Dratini";
    playerH['_id'] = "Togepi";

    playerA['_bet'] = 2; //assuming _id is a unique username
    playerB['_bet'] = 1;
    playerC['_bet'] = 3;
    playerD['_bet'] = 2;

    playerA['_tricksWon'] = 2;

    playerA['_hand'] = [testCardB,testCardA]
    playerD['_hand'] = [testCardA, testCardB, testCardC, testCardD, testCardE]; //Player

    playerA['_score'] = 40;
    playerB['_score'] = 0;
    playerC['_score'] = 12;
    playerD['_score'] = 36;
    playerE['_score'] = 40;
    playerF['_score'] = 0;
    playerG['_score'] = 12;
    playerH['_score'] = 36;

    const testPlayers=[playerA, playerB, playerC, playerD, playerE, playerG, playerF, playerH];
    let cardsPlayed= {};
    cardsPlayed[playerA._id] = testCardF;
    cardsPlayed[playerB._id] = testCardG;
    cardsPlayed[playerC._id] = testCardA;

    //for testing purposes I'm going to build my own state as if game has started
    this.state = {
      players: testPlayers,
      dealer: playerE._id,
      started: true,
      myTurn: true, //called this myTurn because there's already a turn var in game that isn't a bool type
      me: playerD, //assuming we get something that tells us our player status. If not we can extract it from players if we have self id
      cardsPlayed: cardsPlayed, //assuming array of objects {playerID: card}
      trump: testCardH,

      bet: false,
      maxBet: 5,
    }

    //TODO initial fetch

  }
  //TODO: functions that would communicate with server
  handlePlayCard(card, playerID){
    //do magical talking with api/server stuff
    console.log(playerID, 'has played', card.value, card.suit)
    //receive new game state
  }

  handlePlaceBet(bet, playerID){
    //some more magical talking
    console.log(playerID, 'has bet', bet);
    //receive new game state
  }

  //no idea how to use sockets to get new game state if someone else makes change

  render(){

    let displayGame;
    let isDealer = this.state.me._id === this.state.dealer;
    let opponents;
    let playerHand;
    let myCardPlayed;

    let bettingWindow;
    let scoreboard;

    if (this.state.started){

      /*============= Calculating Opponent Locations =======================*/
      let numPlayers = this.state.players.length;
      let myIndex;
      for (let i = 0; i <= numPlayers - 1; i++){ //searching for main player index
        if (this.state.players[i]._id === this.state.me._id){
          myIndex = i;
        }
      }

      let rotate = numPlayers - myIndex; //how much to rotate players
      let shift; //so players will be centralized

      if (numPlayers >= 7) {shift = 0;}
      else if (numPlayers >= 5) {shift = 1;}
      else if (numPlayers >= 3) {shift = 2;}
      else {shift = 3;}

      // Mapping the players into Opponent components based on
      // rotation of location in accordance to their index.
      let count = 0;
      opponents = this.state.players.map((player)=>{
        if (player._id === this.state.me._id){
          count ++;
          return undefined;
        }

        const location = "player-" + (((count + rotate) % numPlayers) + shift); //css style id
        const dealer = player._id === this.state.dealer;
        const opponentCard = (<Card card={this.state.cardsPlayed[player._id]} />);

        count ++; //increment index

        return (
          <div id={location} key={player._id}>
          <Opponent
            dealer={dealer}
            tricksWon={player._tricksWon}
            bet={player._bet}
            cardPlayed={opponentCard}
            playerName={player._id} />
          </div>
          );
        });


      /*============== Player ================*/
      playerHand = (
        <Player
          player={this.state.me}
          dealer={isDealer}
          onClick={(card)=>this.handlePlayCard(card, this.state.me._id)}
          disable={!(this.state.myTurn)} />
      );

      myCardPlayed = (
        <div id='card-i-played'>
        <Card card={this.state.cardsPlayed[this.state.me._id]} />
        </div>);

      /*===============TrumpCard=================*/
      let trumpCard = (
        <div id='trump'>
        <Card card={this.state.trump} onClick={()=>{console.log('I am the trump!')}} />
        Trump Card
        </div>
      );

      /*===============Betting Window============*/
      if (this.state.bet){
        bettingWindow =(
          <Betting
            maxBet={this.state.maxBet} //NOTE: onSubmit's setState should be removed once we have the handler working
            onSubmit={(number)=>{this.setState({bet: false}); this.handlePlaceBet(number, this.state.me._id); }}
            trumpCard={trumpCard}
            disable={!(this.state.myTurn)}
            dealerBet={-1}/>)
      }

      let testBet = (<button type='button'
        onClick={()=>{(this.state.bet) ? this.setState({bet: false}) : this.setState({bet: true})}}>Test Bet</button>);

      /*=========== Place for Scoreboard ============*/
      let scoreArray = [];

      this.state.players.forEach((players)=>{scoreArray.push(players._score)});


      if (this.state.scoreboard){
        scoreboard=(<Scoreboard scores={scoreArray} players={this.state.players} />);
        //<Scoreboard />
      }

      let toggleScore = (<button type='button'
        onClick={()=>{(this.state.scoreboard) ? this.setState({scoreboard: false}) : this.setState({scoreboard: true})}}>Show Scoreboard</button>);


      displayGame=(
        <div>
        {testBet}
        {toggleScore}
        {opponents}
        {myCardPlayed}
        {playerHand}
        {trumpCard}
        {bettingWindow}
        {scoreboard}
        </div>
      );

    } //close of if started


    return(
      <div>
      {displayGame}
      </div>

    );
  }
}

export default GameContainer;
