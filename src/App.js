import React, { Component } from 'react';

import Card from './components/Card.js';
import Betting from './components/Betting.js';
import Opponent from './components/Opponent.js';

import './App.css';

//Notes:
//TODO: frontend needs a way to know who's turn it is and what cards have been played
// during trick. As of April 13, these aren't mentioned in game.js
//TODO: I have a feeling that we should make a container below App.js for all this stuff

class App extends Component {
  constructor(){
    super();

    //TODO: receive game object from database

    this.state = {
    //Game object from database
    mode: '' //this is temp for testing purposes
    }
  }

  render() {

    //------------
    //sample code for components

    //testing Card.js
    let testCard = {};
    testCard['suit'] = 'Diamonds';
    testCard['value'] = '2';

    let sampleCard = (
      <div id='card-sample'>
      <Card card={testCard} onClick={()=>{console.log('Clicked', testCard.value, 'of', testCard.suit)}}/>
      </div>);

    let trumpCard = (
      <div id='trump'>
      <div id='card-sample'>
      <Card card={testCard} onClick={()=>{console.log('I am the trump!')}} />
      Trump Card
      </div></div>
    );

    //testing Betting.js
    let testBet = <button type='button'
    onClick={()=>{ (this.state.mode === 'bet') ? this.setState({mode: ''}) : this.setState({mode: 'bet'})}}>Test Bet</button>

    let sampleBetting;

    if (this.state.mode === 'bet'){
    sampleBetting =(<Betting maxBet={5} onSubmit={(number)=>{console.log('Player bet', number)}} trumpCard={trumpCard} disable={false} dealerBet={-1}/>)
    }

    //testing Opponent.js
    let opponentCard = ( <div id='card-sample'><Card /></div>);
    let sampleOpponent = (
      <div id='player-4'>
      <Opponent
        dealer={true}
        tricksWon={0}
        bet={1}
        cardPlayed={opponentCard}
        playerName={'Player 1'} />
      </div>
    );

    //-------------


    return (
      <div>
      {testBet}
      {trumpCard}
      {sampleCard}
      {sampleOpponent}
      {sampleBetting}
      </div>
    );
  }
}

export default App;
