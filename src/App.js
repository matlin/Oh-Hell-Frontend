import React, { Component } from 'react';
import GameContainer from './components/GameContainer.js';


class App extends Component {
  constructor(){
    super();

  }

  render() {

    return (
      <div>
      <GameContainer />
      </div>
    );
  }
}

export default App;
