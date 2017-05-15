import React, { Component } from 'react';
import Login from './Login.js';
import Register from './Register.js';
import GameView from './GameView.js'
import Lobby from './gameLobby.js';
import Server from '../server.js'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

const SERVER = 'http://localhost:4000';



class OhHellContainer extends Component {
   constructor(){
     super();
     this.state = {
       username: null
     }
  }

  setUser = username => {
    this.setState({username: username});
  }

  isLoggedIn(){
    return document.cookie.indexOf('id') !== -1 && this.state.username != null;
  }

  render(){
    console.log('loaded container');
    return(
      <Router>
        <div>
          <Route path='/' render={() => <Redirect to="/lobby" />} />
          <Link to='/login'><input type='button' value='Login'/></Link>
          <Link to='/register'><input type='button' value='Register'/></Link>
          <Link to='/lobby'><input type='button' value='Lobby'/></Link>
          <Route path='/login/' render={({match, history}) => <Login redirect={history.goBack} setUser={this.setUser}/>}/>
          <Route path='/register' render={() => <Register/>}/>
          <Route path='/lobby' render={ ({history}) => {
            if (this.isLoggedIn()){
              return <Lobby/>
            }else{
              history.push('/lobby');
              return <Redirect to="/login" />
            }
           }
          }
         />
          <Route path='/game/:id' render={ ({match, history}) => {
            console.log('Accessing game route');
            if (this.isLoggedIn()){
              console.log('Rendering game view for ' + this.state.username);
              return <GameView username={this.state.username} gameID={match.params.id} />;
            }else{
              history.push('/game/' + match.params.id);
              return <Redirect to={'/login'}/>
            }
          }}
          />
        </div>
      </Router>
    );
  }
}

export default OhHellContainer
