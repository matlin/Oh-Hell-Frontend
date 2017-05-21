// This file contains a functional component to render a game lobby
// Props: an array of games, a callback to set view state, a callback to
// join a game, a callback to create a game, a server.

import React, { Component } from "react";
import Server from "../server.js";
import LobbyModal from "./LobbyModal.js";
import styled from "styled-components";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Clearfix,
  Glyphicon
} from "react-bootstrap";
import { Link } from "react-router-dom";

const StyledRefreshButton = styled(Button)`
  line-height: 70px;
  background-color: rgba(255,255,255,0);
  color: lightgrey;
  border: none;
  float: right;
`;

const StyledAddButton = styled(Button)`
  vertical-align: super;
  marginLeft: 5px;
`;

const LobbyHeader = styled.h1`
  color: lightgrey;
`;

const HeaderPanel = styled(ListGroupItem)`
  text-align: center;
  background-color: #751010;
  border:none;
`;

class Lobby extends Component {
  constructor() {
    super();
    this.state = {
      joinedGames: [],
      openGames: [],
      showModal: false
    };
    Server.Game.getGames().then(games => {
      if (games) {
        this.setState({
          joinedGames: games.joinedGames,
          openGames: games.openGames
        });
      }
    });
  }

  gameList(games) {
    return games.map(game => {
      let deleteButton;
      if (game.isOwner) {
        deleteButton = (
          <Button
            bsStyle="danger"
            style={{ float: "right", display: "inline" }}
            onClick={() =>
              Server.Game.deleteGame(game.id).then(games => {
                this.setState({
                  joinedGames: games.joinedGames,
                  openGames: games.openGames
                });
              })}
          >
            <Glyphicon glyph="trash" />
          </Button>
        );
      } else {
        deleteButton = null;
      }
      let lockGlyph = game.hasPassword ? <Glyphicon glyph="lock" /> : null;
      return (
        <ListGroupItem className="overlay">
          <Clearfix>
            <div style={{ display: "inline-block" }}>
              <div>
                <Link to={"/game/" + game.id}>{game.gameName + " "}</Link>
                {lockGlyph}
              </div>
              <div>
                <Glyphicon style={{ marginRight: "2px" }} glyph="user" />
                {game.playersInGame}
                /
                {game.maxPlayers}
              </div>
            </div>
            {deleteButton}
          </Clearfix>
        </ListGroupItem>
      );
    });
  }

  render() {
    let joinedGames = this.gameList(this.state.joinedGames);
    let openGames = this.gameList(this.state.openGames);
    return (
      <div
        className="overlay"
        style={{ margin: "0 auto", maxWidth: "650px" }}
        id="Lobby"
      >
        <ListGroup>
          <LobbyModal
            showModal={this.state.showModal}
            submit={gameInfo => {
              Server.Game.createGame(gameInfo).then(games => {
                this.setState({
                  joinedGames: games.joinedGames,
                  openGames: games.openGames,
                  showModal: false
                });
              });
            }}
            close={() => this.setState({ showModal: false })}
          />
          <HeaderPanel>
            <LobbyHeader style={{ display: "inline-block" }}>Lobby</LobbyHeader>
            <StyledRefreshButton
              bsStyle="primary"
              type="button"
              onClick={() => {
                Server.Game.getGames().then(games => {
                  this.setState({
                    joinedGames: games.joinedGames,
                    openGames: games.openGames
                  });
                });
              }}
            >
              <Glyphicon glyph="refresh" />
            </StyledRefreshButton>
          </HeaderPanel>
          <ListGroupItem>
            <div>
              <h3 style={{ display: "inline-block" }}>Your Games</h3>
              <StyledAddButton
                bsSize="xsmall"
                bsStyle="success"
                type="button"
                onClick={() => this.setState({ showModal: true })}
              >
                <Glyphicon glyph="plus" />
              </StyledAddButton>
            </div>
            <ListGroup>{joinedGames}</ListGroup>
            <h3>Open Games</h3>
            <ListGroup>{openGames}</ListGroup>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default Lobby;
