import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

//TODO set up the image url thing, which should be on server end, I think
// Question, when a card hasn't been played, should we display a face down card
// or no card at all?


//simple Card component that returns a clickable card
class Card extends Component {
  constructor(props){
    super();

  }

  render(){

    let cardImage;
    let cardCss = 'text-card'

    if (this.props.card){ //not face up
      cardImage = this.props.card.value + this.props.card.suit; //I think this would be card.id
    }else{
      cardImage = 'empty'; //face down
      cardCss = 'empty-card';
    }

    //const imageURL = "/root/img/" + cardImage;

    let display = (
      <div id={cardCss} onClick={this.props.onClick}>{cardImage}</div> //temporary text
      //<div id={'Diamonds2'} onClick={this.props.onClick}></div> //temporary testing with css file
      //<img src={imageURL} alt={cardImage} onClick={this.props.onClick}></img>
      );

    return (
      <div id='card-sample'>
      {display}
      </div>
    );
  }
}

Card.propTypes = {
  card: PropTypes.object,
  onClick: PropTypes.func,
}

export default Card;
