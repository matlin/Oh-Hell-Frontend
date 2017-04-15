import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Opponent class that displays dealer token, tricks won, bet, cardplayed, and player name
//depending on set props

class Opponent extends Component{
  constructor(props){
    super();

  }

  render(){

    let dealerToken;
    if (this.props.dealer){
      dealerToken = (
        <div id='dealer-token'>Dealer</div>
      );
    }else{
      dealerToken = (<br></br>); //space for dealer token
    }

    let tricksWon = 'Tricks Won: ';
    if (this.props.tricksWon){
      tricksWon += this.props.tricksWon;
    }else{
      tricksWon += '0';
    }

    let bet = 'Bet: ';
    if (this.props.bet){
      bet += this.props.bet;
    }

    let stats = (
      <span>{tricksWon}<br></br>{bet}</span>
    );

    return(
      <div id='opponent'>
      {dealerToken}
      {stats}
      {this.props.cardPlayed}
      {this.props.playerName}
      </div>
    );
  }
}

Opponent.PropTypes = {
  dealer: PropTypes.bool,
  tricksWon: PropTypes.number,
  bet: PropTypes.number,
  cardPlayed: PropTypes.object.isRequired,
  playerName: PropTypes.string.isRequired,
}

export default Opponent;
