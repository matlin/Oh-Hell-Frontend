//game container basic version

import React, {Component} from 'react';
import styled from 'styled-components'


const BetInput = styled.input`
  display: block;
`;

const CardInput = styled.input`
  display: block;
`;

//returns printed string with game state info
function GameState(props){
  return(
    <div id="GameState">
      <p>{props.Gamestate}</p>
    </div>
  )
}

//displays messages
function Messages(props){
  return(
    <div id="Messages">
      <p>{props.messages}</p>
    </div>
  )
}

function Hand(props){
  return(
    <div id="Hand">
      <p>{props.hand}</p>
    </div>
  )
}

class GameContainerbasic extends Component{
  constructor(){
    super();
    this.state = {
      bet: '',
      card: ''
    }
  }

  handleTextUpdate(event, field){
    this.setState({[field]:event.target.value})
  }

  placeBet(){
    this.props.placeBet(this.state.bet);
  }

  playCard(){
    this.props.playCard(this.state.card);
  }

  render(){
    console.log(this.props)
    console.log(this.props.Gamestate) //currently returns the functionality
    console.log(this.props.hand)

    let gameState = (<GameState Gamestate={this.props.Gamestate}/>)
    let messages = (<Messages messages={this.props.messages}/>)
    let hand = (<Hand hand={this.props.hand}/>)

    const bet = (<BetInput
    type="text"
    size='45'
    value={this.state.bet}
    placeholder="Place bet here!"
    onChange={(event)=> this.handleTextUpdate(event, 'bet')}
    />)

    const card = (<CardInput
    type="text"
    size='45'
    value={this.state.card}
    placeholder="Enter card here!"
    onChange={(event)=> this.handleTextUpdate(event, 'card')}
    />)

    return(
      //overall container
      <div>GameContainerbasic
        <div>
          {gameState}
          {messages}
        </div>
        <div>
          {hand}
          {bet}
          <input type="button" disabled={this.state.bet === ''} onClick={()=> this.placeBet()} value="Place bet"/>
          {card}
          <input type="button" disabled={this.state.card === ''} onClick={()=> this.placeBet()} value="Play card"/>
        </div>
      </div>
    )
  }
}
export default GameContainerbasic;
