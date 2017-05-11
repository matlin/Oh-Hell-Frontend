// This file contains a functional component to render a game lobby
// Props: an array of games, a callback to set view state, a callback to
// join a game, a callback to create a game, a server.

import React, {Component} from 'react';
import Server from '../server.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Lobby extends Component {
  constructor(){
    super();
    this.state = {
      joinedGames: [],
      openGames: []
    }
    Server.Game.getGames().then( games => {
      if (games){
          this.setState({joinedGames: games.joinedGames, openGames: games.openGames});
      }
    });
  }

   gameList(games) {
     return games.map( game => {
       return (
         <div>
           <Link to={'/game/' + game.id}>
             <span>{game.id} </span>
             <span>{game.playersInGame}/{game.maxPlayers}</span>
           </Link>
         </div>
       );
     });
   }

  render(){
    let joinedGames = this.gameList(this.state.joinedGames);
    let openGames = this.gameList(this.state.openGames);
    return(
      <Header style={{marginLeft: 3 + 'em'}} id="Lobby">
        <h1>Gamelobby</h1>
        <button type="button" onClick={() => Server.Game.createGame()}>Create Game</button>
        <button type="button" onClick={() => {Server.Game.getGames().then((games)=>{this.setState({activeGames: games})})}}>Refresh</button>
        <h2>Your Games</h2>
        <div>{joinedGames}</div>
        <h2>Open Games</h2>
        <div>{openGames}</div>
      </Header>
    )
  }
}

export default Lobby;
