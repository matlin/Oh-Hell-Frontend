/* This is the container component for most of the app. It handles the
 * react-routing rendering. It also handles redirecting users who aren't logged
 * in.
 */


import React, { Component } from "react";
import Login from "./Login.js";
import Register from "./Register.js";
import GameView from "./GameView.js";
import Lobby from "./gameLobby.js";
import NavButton from "./NavButton.js";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

class OhHellContainer extends Component {
  constructor() {
    super();
    this.state = {
      username: null
    };
  }

  setUser = username => {
    this.setState({ username: username });
  };

  isLoggedIn() {
    //need to make this more robust
    return this.state.username != null;
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/" render={() => <Redirect to="/lobby" />} />
          <div>
            <NavButton />
          </div>
          <Route
            path="/login"
            render={({ match, history }) => (
              <Login redirect={history.goBack} setUser={this.setUser} />
            )}
          />
          <Route
            path="/register"
            render={() => <Register setUser={this.setUser} />}
          />
          <Route
            path="/lobby"
            render={({ history }) => {
              if (this.isLoggedIn()) {
                return <Lobby />;
              } else {
                history.push("/lobby");
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route
            path="/game/:id"
            render={({ match, history }) => {
              if (this.isLoggedIn()) {
                return (
                  <GameView
                    username={this.state.username}
                    gameID={match.params.id}
                  />
                );
              } else {
                history.push("/game/" + match.params.id);
                return <Redirect to={"/login"} />;
              }
            }}
          />
        </div>
      </Router>
    );
  }
}

export default OhHellContainer;
