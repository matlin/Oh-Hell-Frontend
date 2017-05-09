import React, { Component } from 'react';
import Login from './Login.js';
import Register from './Register.js';
//import GameContainer from './GameContainer.js';
//import GameContainerBasic from './GameContainerbasic.js';
import GameView from './GameView.js'
import Lobby from './gameLobby.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const SERVER = 'http://localhost:4000'




/*
  socket.on('connection', function (data) {
    console.log(data);
    console.log('connection')
  });
*/

class OhHellContainer extends Component {
   constructor(){
     super();
     this.state = {
       mode: 'main'
     }
  }

  render(){
    return(
      <Router>
        <div>
          <Link to='/login'><input type='button' value='Login'/></Link>
          <Link to='/register'><input type='button' value='Register'/></Link>
          <Link to='/lobby'><input type='button' value='Lobby'/></Link>
          <Route path='/login' render={() => <Login/>}/>
          <Route path='/register' render={() => <Register/>}/>
          <Route path='/lobby' render={() => <Lobby/>}/>
          <Route path='/game/:id' component={GameView} />
        </div>

      </Router>
    );
  }


/*
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
          <Lobby server={SERVER} back={()=>this.setState({mode:'main'})}/>
          </div>
        )
      } else if (this.state.mode==='game'){
        return(
          <div>
            <GameContainerbasic server={SERVER} placeBet={(bet)=> this.placeBet(bet)} playCard={(card)=> this.playCard(card)} Gamestate={(game)=> this.gameState(game)} messages={"here are the messages"} hand={(hand)=> this.getHand(hand)} />
            <input type='button' onClick={()=>{this.setState({mode:'main'})}} value="Back"/>
          </div>
        )
      }
    }
*/
}

export default OhHellContainer
