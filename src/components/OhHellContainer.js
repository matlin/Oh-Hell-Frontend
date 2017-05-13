import React, { Component } from 'react';
import Login from './Login.js';
import Register from './Register.js';
import GameContainer from './GameContainer.js';
import GameContainerBasic from './GameContainerbasic.js';
import GameView from './GameView.js'
import Lobby from './gameLobby.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const SERVER = 'http://localhost:4000';





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

  isLoggedIn(nextState, replace){
    console.log(nextState, replace);
    if (document.cookie.indexOf('id') === -1){
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  }

  render(){
    console.log('loaded container');
    return(
      <Router>
        <div>
          <Link to='/login'><input type='button' value='Login'/></Link>
          <Link to='/register'><input type='button' value='Register'/></Link>
          <Link to='/lobby'><input type='button' value='Lobby'/></Link>
          <Route path='/login' render={() => <Login/>}/>
          <Route path='/register' render={() => <Register/>}/>
          <Route path='/lobby' onEnter={this.isLoggedIn} render={() => <Lobby/>}/>
          <Route path='/game/:id' component={GameView} />
        </div>

      </Router>
    );
  }

}

export default OhHellContainer
