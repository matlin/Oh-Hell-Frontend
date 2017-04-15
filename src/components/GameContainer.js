import React, { Component } from 'react';

import Card from './Card.js';
import Betting from './Betting.js';
import Opponent from './Opponent.js';
import Player from './Player.js';
//import ScoreBoard from './components/Player.js';

import '../App.css';

//NOTE: assuming that the absolute max amount of players is 8

class GameContainer extends Component{
  constructor(){
    super();

    //get Game state

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
    playerB['_id'] = "Char";
    playerC['_id'] = "Squirtle";
    playerD['_id'] = "Ash";
    playerE['_id'] = "Meowth"; //assuming _id is a unique username
    playerF['_id'] = "Misty";
    playerG['_id'] = "Dratini";
    playerH['_id'] = "Togepi";

    playerA['_bet'] = 2; //assuming _id is a unique username
    playerB['_bet'] = 1;
    playerC['_bet'] = 3;
    playerD['_bet'] = 2;

    playerA['_tricksWon'] = 2;

    playerD['_hand'] = [testCardA, testCardB, testCardC, testCardD, testCardE]; //Player

    playerA['_score'] = 40;
    playerB['_score'] = 0;
    playerC['_score'] = 12;
    playerD['_score'] = 36;
    playerE['_score'] = 40;
    playerF['_score'] = 0;
    playerG['_score'] = 12;
    playerH['_score'] = 36;

    const testPlayers=[playerA, playerB, playerC, playerD, playerE, playerF, playerG, playerH,];
    let cardsPlayed= {};
    cardsPlayed[playerA._id] = testCardF;
    cardsPlayed[playerB._id] = testCardG;

    //for testing purposes I'm going to build my own state as if game has started
    this.state = {
      players: testPlayers,
      dealer: playerA._id,
      started: true,
      myTurn: true, //called this myTurn because there's already a turn var in game that isn't a bool type
      me: playerD, //assuming we get something that tells us our player status
      cardsPlayed: cardsPlayed,
      trump: testCardH,

      bet: false,
      maxBet: 5,
    }

    //Place here: functions that would communicate with server
  }
  render(){

    let displayGame;
    let isDealer = this.state.me._id === this.state.dealer;
    let opponents;
    let playerHand;
    let bettingWindow;

    //all
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

        let location = "player-" + (((count + rotate) % numPlayers) + shift);
        let dealer = player._id === this.state.dealer;
        let opponentCard;

        //console.log(location, player._id);
        if (this.state.cardsPlayed.hasOwnProperty(player._id)){ //finding card played
          opponentCard = (<Card card={this.state.cardsPlayed[player._id]} />);
        }else{
          opponentCard = (<Card />);
        }
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
      //console.log(opponents);


      /*==============Player Hand================*/
      playerHand = (
        <Player
          player={this.state.me}
          dealer={isDealer}
          onClick={(suit, value)=>console.log(value, suit)} />
      );


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
            maxBet={this.state.maxBet}
            onSubmit={(number)=>{console.log('Player bet', number)}}
            trumpCard={trumpCard}
            disable={this.state.myTurn}
            dealerBet={-1}/>)
      }
      let testBet = (<button type='button'
        onClick={()=>{(this.state.bet) ? this.setState({bet: false}) : this.setState({bet: true})}}>Test Bet</button>);

      displayGame=(
        <div>
        {opponents}
        {playerHand}
        {trumpCard}
        {bettingWindow}
        {testBet}
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
