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
    let playerHand = this.props.player._hand;

    playerHand.sort((a,b) => { //sorting so that cards would be in some kind of order
      if ((a.suit + a.value) > (b.suit + b.value)){ return 1;}
      if ((a.suit + a.va) < (b.suit + b.value)) {return -1;}
      return 0;});

    const displayHand = playerHand.map((card)=>{
      return (
        <div id='card-hand' key={card.suit + card.value}>
        <Card card={card} onClick={()=>{
          this.props.disable ? console.log('Not your turn') : this.props.onClick(card)}} />
        </div>
      );
    });

    //tricksWon display text
    let tricksWon = 'Tricks Won: ';
    if (this.props.tricksWon){
      tricksWon += this.props.player._tricksWon;
    }else{
      tricksWon += '0';
    }
    //bet display text
    let bet = "Bet: ";
    if (this.props.player._bet) {
      bet += this.props.player._bet;
    }

    //displaying text in its own div
    const stats = (
      <div id='player-stats'>
      <b>{this.props.player._id}</b><br></br>
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
  player: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  disable: PropTypes.bool,
}

export default Player;
