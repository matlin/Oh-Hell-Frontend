//game container basic version

import React, {Component} from 'react';
import styled from 'styled-components'


const BetInput = styled.input`
  display: block;
`;

const CardInput = styled.input`
  display: block;
`;


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
  constructor(props){
    super(props);
    this.state = {
      gameState: null,
      bet: '',
      card: ''
    }
    this.GameState();
  }

  //returns printed string with game state info
  GameState(){
    fetch(this.props.server + '/game/' ) // + + this.props.gameID
      .then((response)=>{
        if (response.ok){
          return response.json();
        }
      })
      .then((game)=>{
        this.setState({gameState: game});
      });
  }


  handleInputUpdate(event, field){
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
    console.log(this.props.gameState) //currently returns the functionality
    console.log(this.props.hand)

    //let gameState = (<GameState Gamestate={this.props.Gamestate}/>)
    let messages = (<Messages messages={this.props.messages}/>)
    let hand = (<Hand hand={this.props.hand}/>)

    const bet = (<BetInput
    type="text"
    size='45'
    value={this.state.bet}
    placeholder="Place bet here!"
    onChange={(event)=> this.handleInputUpdate(event, 'bet')}
    />)

    const card = (<CardInput
    type="text"
    size='45'
    value={this.state.card}
    placeholder="Enter card here!"
    onChange={(event)=> this.handleInputUpdate(event, 'card')}
    />)

    return(
      //overall container
      <div>GameContainerbasic
        <div>
          <div> {this.state.gameState} </div> would display game state if we had a game ID
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
