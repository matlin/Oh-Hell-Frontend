//game container basic version

import React, {Component} from 'react';

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


    }

render(){
  console.log(this.props)
  let gameState = (<GameState Gamestate={this.props.Gamestate}/>)
  let messages = (<Messages messages={this.props.messages}/>)
  let hand = (<Hand hand={this.props.hand}/>)
  return(
    //overall container
    <div>GameContainerbasic
      <div>
        {gameState}
        {messages}
      </div>
      <div>
        {hand}
        <input type="text" name="bet" placeholder="bet"/>
        <button type="button" onClick={()=>{   }} >Place Bet!</button>
        <input type="text" name="playCard" placeholder="your card"/>
        <button type="button" >Play Card!</button>
      </div>
    </div>

  )
}
}
export default GameContainerbasic;
