import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

//TODO set up the image url thing

//simple Card component that returns a clickable card
class Card extends Component {
  constructor(props){
    super();

  }

  render(){

    let cardImage;

    if (this.props.card){ //not face up
      cardImage = this.props.card.suit + this.props.card.value;
    }else{
      cardImage = 'back'; //face down
    }

    //const imageURL = "/root/img/" + cardImage;

    let display = (
      <div id={cardImage} onClick={this.props.onClick}></div> //temperory testing with css file
      //<img src={imageURL} alt={cardImage} onClick={this.props.onClick}></img>
      );

    return (
      <div>
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
