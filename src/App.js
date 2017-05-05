import React, { Component } from 'react';
import OhHellContainer from './components/OhHellContainer.js';

import './App.css'

//TODO: Need to create lobby components.

class App extends Component {
   constructor(){
     super();

  }

  render(){

    return (
      <div className="App">
        <h1>Oh Hell!</h1>
        <OhHellContainer />
      </div>
    );
  }
}

export default App;
