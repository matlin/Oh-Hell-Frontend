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
      dealerToken = (<br></br>);
    }

    const tricksWon = 'Tricks Won: ' + this.props.tricksWon;

    let bet = 'Bet: '
    if (this.props.bet){
      bet += this.props.bet;
    }

    let stats = (
      <p>{tricksWon}<br></br>{bet}</p>
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
  dealer: PropTypes.bool.isRequired,
  tricksWon: PropTypes.number.isRequired,
  bet: PropTypes.number,
  cardPlayed: PropTypes.object.isRequired,
  playerName: PropTypes.string.isRequired,
}

export default Opponent;
