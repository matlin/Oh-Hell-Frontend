import React, { Component } from 'react';
import GameContainer from './components/GameContainer.js';

import './App.css'

class App extends Component {
   constructor(){
     super();

  }

  render(){

    return (
      <div className="App">
        <h1>Oh Hell!</h1>
        <GameContainer />
      </div>
    );
  }
}

export default App;
