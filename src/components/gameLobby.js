// This file contains a functional component to render a game lobby
// Props: an array of games, a callback to set view state, a callback to
// join a game, a callback to create a game, a server.

import React, {Component} from 'react';


class Lobby extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeGames: []
    }
    this.getGames();
 }

 getGames() {
     fetch(this.props.server + '/game/')
       .then((response)=>{
         if (response.ok){
           return response.json();
         }
       })
       .then((games)=>{
         this.setState({activeGames: games});
       });
  }

  // joinGames returns a function that lets a user join a specific game
  joinGame(id) {
      const request = new Request(
        this.props.server + '/game/' + id + '/join', { method:'PUT' }
       );
      fetch(request)
      .then((response)=>{
        console.log(response.status);
        if (response.ok){
          //console.log('Joined the Game!');
        }
      })
  }

  createGame() {
    const request = new Request(
      this.props.server + '/game/create', { method:'POST' }
     );
    fetch(request)
    .then((response)=>{
      console.log(response.status);
      if (response.ok){
        //console.log('Created a game!');
        this.getGames();
      }
    })
  }
  render(){
    const games = this.state.activeGames.map((game)=>{
      return (
        <div>
          <span>{game.id}</span>
          <span>{game.playersInGame}</span>
          <span>/</span>
          <span>{game.maxPlayers}</span>
          <button onClick={()=>this.joinGame(game.id)}>Join</button>
        </div>
      )
    });

    return(
      <div style={{marginLeft: 3 + 'em'}} id="Lobby">
        <h1>Gamelobby</h1>
        <button type="button" onClick={() => this.createGame()}>Create Game</button>
        <button type="button" onClick={() => this.getGames()}>Refresh</button>
        <div>{games}</div>
      </div>
    )
  }
}

export default Lobby;
