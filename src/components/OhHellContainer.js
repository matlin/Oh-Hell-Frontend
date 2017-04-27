import React, { Component } from 'react';
import Login from './Login.js';
import Register from './Register.js';
import GameContainer from './GameContainer.js';
import GameContainerbasic from './GameContainerbasic.js';
import Lobby from './gameLobby.js';

const SERVER = 'http://localhost:4000'

class OhHellContainer extends Component {
   constructor(){
     super();
     this.state = {
       mode: 'main'
     }
  }

  login(user) {
    const userStr = JSON.stringify(user);
    const request = new Request(
      SERVER + '/users/login',
      {
        method:'POST',
        body:userStr,
        headers: new Headers({'Content-type':'application/json'})
      }
    );
    console.log(userStr);
    fetch(request)
    .then((response)=>{
      console.log(response.status);
      if (response.ok){
        this.setState({mode:'join'})
      }
    })
  }

  register(user) {
    const userStr = JSON.stringify(user);
    const request = new Request(
      SERVER + '/users/register',
      {
        method:'POST',
        body:userStr,
        headers: new Headers({'Content-type':'application/json'})
      }
    );
    console.log(userStr);
    fetch(request)
    .then((response)=>{
      console.log(response.status);
      if (response.ok){
        this.setState({mode:'join'})
      }
    })
  }


////////////////////////////////

//this should return the gamestate that was exported from the backend and pass it to
//gameContainer so we can print the game state
//TODO: fix error it produces when given SERVER + '/game/' +gameID,
//TODO: get the request to work so it actually prints the game state in game container
  gameState(game) {
    const userGame = JSON.stringify(game);
    const request = new Request(
      SERVER + '/game/test',
      {
        method:'GET',
        body:userGame,
        headers: new Headers({'Content-type':'application/json'})
      }
    );
    console.log(userGame);
    fetch(request)
    .then((response)=>{
      console.log(response.status);
      if (response.ok){
        return response.json();
      }
    })
  }

//this should return the users hand so they can see their cards
//TODO fix it so it works with SERVER +'/game/' + gameID + '/hand',
//TODO have it return the hand and pass it to game container so we can print the users hand
  getHand(hand) {
    const userHand = JSON.stringify(hand);
    const request = new Request(
      SERVER + '/game/test/hand',
      {
        method:'GET',
        body:userHand,
        headers: new Headers({'Content-type':'application/json'})
      }
    );
    console.log(userHand);
    fetch(request)
    .then((response)=>{
      console.log(response.status);
      if (response.ok){
        return response.json();
      }
    })
  }

//////////////////////////////

  placeBet(bet) {
    const gameID = 'test'; // NEEDS REPLACING WHEN WE FIGURE OUT HOW TO GET THE GAMEID IN HERE
    const betStr = JSON.stringify(bet);
    const request = new Request(
      SERVER + '/game/' + gameID,
      {
        method:'POST',
        body:betStr,
        headers: new Headers({'Content-type':'application/json'})
      }
    );
    console.log(betStr);
    fetch(request)
    .then((response)=>{
      console.log(response.status);
      if (response.ok){
        return response.json();
      }
    })
  }

  playCard(card) {
    const gameID = 'test'; // NEEDS REPLACING WHEN WE FIGURE OUT HOW TO GET THE GAMEID IN HERE
    const cardStr = JSON.stringify(card);
    const request = new Request(
      SERVER + '/game/' + gameID,
      {
        method:'POST',
        body:cardStr,
        headers: new Headers({'Content-type':'application/json'})
      }
    );
    console.log(cardStr);
    fetch(request)
    .then((response)=>{
      console.log(response.status);
      if (response.ok){
        return response.json();
      }
    })
  }



  render(){
    if (this.state.mode==='main'){
      return(
        <div>
          <input type="button" onClick={()=>{this.setState({mode:'login'})}} value="Login"/>
          <input type='button' onClick={()=>{this.setState({mode:'register'})}} value="Register"/>
          <input type='button' onClick={()=>{this.setState({mode:'join'})}} value="Lobby"/>
          <input type='button' onClick={()=>{this.setState({mode:'game'})}} value="Current Game"/>
        </div>
        );
      } else if (this.state.mode==='login'){
        return(
          <div>
            <Login login={(user)=> this.login(user)}/>
            <input type='button' onClick={()=>{this.setState({mode:'main'})}} value="Back"/>
          </div>
        )
      } else if (this.state.mode==='register'){
        return(
          <div>
            <Register register={(user)=> this.register(user)}/>
            <input type='button' onClick={()=>{this.setState({mode:'main'})}} value="Back"/>
          </div>
        )
      } else if (this.state.mode==='join'){
        return(
          <div>
          <Lobby server={SERVER}/>
          </div>
        )
      } else if (this.state.mode==='game'){
        return(
          <div>
            <GameContainerbasic placeBet={(bet)=> this.placeBet(bet)} playCard={(card)=> this.playCard(card)} Gamestate={(game)=> this.gameState(game)} messages={"here are the messages"} hand={(hand)=> this.getHand(hand)} />
            <input type='button' onClick={()=>{this.setState({mode:'main'})}} value="Back"/>
          </div>
        )
      }
    }
}

export default OhHellContainer
