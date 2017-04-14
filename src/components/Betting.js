import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

// Betting window that contains a text of current selected bid, arrows to
// increase/decrease bid, and a submit button. Also included trump card.

// Subcomponent that creates the increase and decrease arrows
function Arrows(props){

  //increase bet by 1
  let increase = (()=>{
    if (props.bet === props.maxBet){
      //do nothing
    }else{
      props.onClick(props.bet + 1);
    }});

  //decrease bet by 1
  let decrease = (()=>{
    if (props.bet === 0){
      //do nothing
    }else{
      props.onClick(props.bet - 1);
    }});

  return(
    <div>
      <div id='up-arrow' onClick={increase}>
      ^
      </div>
      <div id='down-arrow' onClick={decrease}>
      v
      </div>
    </div>
  )
}

// Actual Betting window
class Betting extends Component {
  constructor(props){
    super(props);

    let dealer = -1; //a bet that cannot be bet, -1 represents no bet that cannot be bet

    if (this.props.dealerBet){ //assuming that the unbiddable number is passed down
      dealer = this.props.dealerBet;
    }

    this.state = {
      bet: 0,
      dealer: dealer,
    };
  }

  render(){

    let myButton;

    if ((this.state.dealer === -1) || (this.state.bet !== this.state.dealer)){
      myButton = (<button id='bet-button' type='button' onClick={()=>this.props.onSubmit(this.state.bet)}>Submit</button>);
    }else if (this.state.bet === this.state.dealer){
      myButton = (<button id='bet-button' type='button' disabled>Submit</button>);
    }else{
      console.log('Check myButton for bug');
    }

    let display;

    if (this.props.disable){
      display = (<div><p>Please wait your turn to bet.</p></div>);
    }else{
      display = (
        <div>
         <p>Place Your Bet!</p>
         <div id='bet-bar'>
          <Arrows maxBet={this.props.maxBet} bet={this.state.bet} onClick={(number)=>{this.setState({bet: number})}} />
          <div id='bet-box'>{this.state.bet}</div>
          {myButton}
         </div>
         {this.props.trumpCard}
        </div>
      );
    }

    return(<div id='bet-window'>{display}</div>);
  }
}

Betting.propTypes = {
  maxBet: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  trumpCard: PropTypes.element.isRequired,
  disable: PropTypes.bool.isRequired,
  dealerBet: PropTypes.number,
}

export default Betting;
