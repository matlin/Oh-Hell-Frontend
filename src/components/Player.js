import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from './Card.js';
import '../App.css';

// Displays the player's hand, the card they had played, how many tricks they have
// won and what they had bet.
class Player extends Component{
  constructor(props){
    super()

  }

  render(){

    //giving the player a token if they are dealer
    let dealerToken;

    if (this.props.dealer){
      dealerToken = (
        <div id='dealer-token'>Dealer</div>
      );
    }

    //sorting player hand then receiving a bunch of divs of Card component
    let playerHand = this.props.hand;

    playerHand.sort((a,b) => { //sorting so that cards would be in some kind of order
      if ((a.suit + a.value) > (b.suit + b.value)){ return 1;}
      if ((a.suit + a.va) < (b.suit + b.value)) {return -1;}
      return 0;});

    const displayHand = playerHand.map((card)=>{
      return (
        <div id='card-hand' key={card.suit + card.value}>
        <Card card={card} onClick={()=>{this.props.onClick(card.suit, card.value)}} />
        </div>
      );
    });

    //tricksWon display text
    const tricksWon = "Tricks Won: " + this.props.tricksWon;

    //bet display text
    let bet = "Bet: ";
    if (this.props.bet) {
      bet += this.props.bet;
    }

    //displaying text in its own div
    const stats = (
      <div id='player-stats'>
      {this.props.playerName}<br></br>
      {tricksWon}<br></br>
      {bet}<br></br>
      {dealerToken}
      </div>
    );

    return (
      <div id='player-window'>
      {displayHand}
      {stats}
      </div>
    );
  }
}

Player.propTypes= {
  dealer: PropTypes.bool,
  hand: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  playerName: PropTypes.string.isRequired,
  tricksWon: PropTypes.number.isRequired,
  bet: PropTypes.number,
}

export default Player;
