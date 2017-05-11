// This file contains a functional component to render a game lobby
// Props: an array of games, a callback to set view state, a callback to
// join a game, a callback to create a game, a server.

import React, {Component} from 'react';
import Server from '../server.js';
import LobbyModal from './LobbyModal.js';
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
      openGames: [],
      showModal: false
    }
    Server.Game.getGames().then( games => {
      if (games){
          this.setState({joinedGames: games.joinedGames, openGames: games.openGames});
      }
    });
  }

   gameList(games) {
     return games.map( game => {
       console.log(game);
       return (
         <div>
           <Link to={'/game/' + game.id}>
             <span>{game.gameName+' '}</span>
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
      <div style={{marginLeft: 3 + 'em'}} id="Lobby">
        <LobbyModal showModal={this.state.showModal} close={() => this.setState({ showModal: false })}/>
        <h1>Gamelobby</h1>
        <button type="button" onClick={() => this.setState({ showModal: true })}>Create Game</button>
        <button type="button" onClick={() => {Server.Game.getGames().then((games)=>{this.setState({joinedGames: games.joinedGames, openGames: games.openGames})})}}>Refresh</button>
        <h2>Your Games</h2>
        <div>{joinedGames}</div>
        <h2>Open Games</h2>
        <div>{openGames}</div>
      </div>
    )
  }
}

export default Lobby;
