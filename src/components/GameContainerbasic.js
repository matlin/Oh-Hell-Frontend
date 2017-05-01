//game container basic version

import React, {Component} from 'react';
import styled from 'styled-components';
import Server from '../server.js';

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
      gameState: {joined: false},
      messages: null,
      id: props.match.params.id,
    }
    this.loadGame();
    //this.GameState();
  }

  loadGame(){
    if (this.state.id){
      Server.game.get(this.state.id).then(response => {
        this.setState({gameState: response.state, messages:response.message});
        if (response.messsage){
            window.alert();
        }
      })
    }else{
      console.error('No game id provided');
    }
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

    if (!this.state.gameState.joined){
      return (
        <div>
          <p>You are not in this game. Join?</p>
          <input type="button" value="Join" onClick={Server.game.join.bind(this,this.state.id)} />
        </div>
      )
    }


    return(
      //overall container
      <div>GameContainerbasic
        <div>
          <div>State:<p>{JSON.stringify(this.state.gameState)}</p></div>
          <div>Messages:<p>{this.state.messages}</p></div>
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
