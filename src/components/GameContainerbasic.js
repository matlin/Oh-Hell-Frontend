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
        this.setState({gameState: response.state});
        if (response.messsage){
            window.alert(response.message);
        }
      })
    }else{
      console.error('No game id provided');
    }
  }

  startGame(){
    if (this.state.id && this.state.gameState.players.length > 0){
      Server.game.start(this.state.id).then(response => {
        //console.log(response);
        this.setState({gameState: response.state, messages:response.message});
        if (response.message){
          window.alert(response.message);
          this.loadGame();
        }
      })
    } else{
      console.error('Could not start game');
    }
  }

  handleInputUpdate(event, field){
    this.setState({[field]:event.target.value})
  }

  placeBet(){
    Server.game.bet(this.state.id, this.state.bet).then(response => {
      this.setState({gameState: response.state, messages:response.message});
      if (response.message){
        window.alert(response.message);
        //this.loadGame();
      }
    })
    console.log(this.state);
  }

  stateCallback(response){
    console.log(response);
    this.setState({gameState: response.state, messages:response.message});
    if (response.message){
      //window.alert(response.message);
    }
  }

  playCard(card = this.state.card){
    Server.game.playCard(this.state.id, card).then(response => {
      console.log(response);
      this.setState({gameState: response.state, messages:response.message});
      if (response.message){
        window.alert(response.message);
        //this.loadGame();
      }
    })
  }

  render(){
    console.log(this.props)
    console.log(this.props.gameState) //currently returns the functionality
    console.log(this.state.hand)

    //let gameState = (<GameState Gamestate={this.props.Gamestate}/>)
    let messages = (<Messages messages={this.state.messages}/>)
    let hand = (<Hand hand={this.state.hand}/>)

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

    if (this.state.gameState.joined === false){
      return (
        <div>
          <p>You are not in this game. Join?</p>
          <input type="button" value="Join" onClick={() => {
              Server.game.join(this.state.id).then((response) => {this.stateCallback(response)});
            }
          }
          />
        </div>
      )
    }

    const cardButtons = (cards) => {
      return cards.map(cardObj => {
        return (
          <input type="button"
            onClick={()=> {
              this.playCard(cardObj.id);
            }}
            value={`${cardObj.value} of ${cardObj.suit}`}
            //
          />
        );
      });
    }


    return(
      //overall container
      <div>GameContainerbasic
        <div>
          <div>State:<pre>{JSON.stringify(this.state.gameState, null, 2)}</pre></div>
          <div>Messages:<p>{this.state.messages}</p></div>
          <div>
          Your Hand (click card to play): {cardButtons(this.state.gameState.hand)}
          </div>
        </div>
        <div>
        <input type="button" value="Start" onClick={()=>this.startGame()} />
          {hand}
          {bet}
          <input type="button" disabled={this.state.bet === ''} onClick={()=> this.placeBet()} value="Place bet"/>

        </div>
      </div>
    )
  }
}
export default GameContainerbasic;
