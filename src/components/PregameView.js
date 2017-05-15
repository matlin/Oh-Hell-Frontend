import React, { Component } from "react";
import styled from "styled-components";
import {
  Panel,
  ListGroup,
  ListGroupItem,
  Form,
  FormControl,
  ControlLabel,
  Button,
  Clearfix,
  Glyphicon
} from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const EmptyUser = styled(Glyphicon)`
  color: lightgrey;
  font-size: 30px;
  marginRight: 2px;
`;

const FullUser = styled(Glyphicon)`
  font-size: 30px;
  marginRight: 2px;
`;

const LobbyHeader = styled.h1`
  color: white;
`;

const HeaderPanel = styled(ListGroupItem)`
  text-align: center;
  background-color: #34495E;
`;

const StyledButton = styled(Button)`
  margin-right: 5px;
`;

class PregameView extends Component {
  constructor() {
    super();
    this.state = {
      password: ""
    };
  }

  handleTextUpdate(event, field) {
    this.setState({ [field]: event.target.value });
  }

  render() {
    console.log("Did we join the game?", this.props.joined);
    let userBar = [];
    for (let i = 0; i < this.props.maxPlayers; i++) {
      if (i < this.props.players.length) {
        userBar.push(<FullUser glyph="user" />);
      } else {
        userBar.push(<EmptyUser glyph="user" />);
      }
    }
    let passwordField;
    if (this.props.hasPassword && !this.props.joined) {
      passwordField = (
        <Form style={{ "margin-top": "10px", "margin-bottom": "5px" }}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="text"
            value={this.state.password}
            placeholder=""
            onChange={event => this.handleTextUpdate(event, "password")}
          />
        </Form>
      );
    } else {
      passwordField = null;
    }
    let joinButton;
    let cancel;
    if (!this.props.joined) {
      joinButton = (
        <StyledButton
          onClick={() => this.props.join(this.state.password)}
          bsStyle="success"
        >
          Join
        </StyledButton>
      );
    } else if (this.props.joined && !this.props.isOwner) {
      joinButton = (
        <StyledButton
          onClick={() => this.props.join(this.state.password)}
          bsStyle="success"
          disabled
        >
          Joined
        </StyledButton>
      );
    } else {
      //joinButton becomes a start button for the owner
      console.log(this.props.players.length < this.props.minPlayers);
      joinButton =
        (<StyledButton
          onClick={this.props.start}
          bsStyle="danger"
          disabled={this.props.players.length < this.props.minPlayers}
        >
          Start
        </StyledButton>
      );
    }
    return (
      <div style={{ margin: "0 auto", maxWidth: "450px" }}>
        <HeaderPanel>
          <LobbyHeader>{this.props.gameName}</LobbyHeader>
        </HeaderPanel>
        <ListGroupItem>{userBar}</ListGroupItem>
        <ListGroupItem>
          {passwordField}
          {joinButton}
          <Link to="/lobby"><Button>Cancel</Button></Link>
        </ListGroupItem>
      </div>
    );
  }
}

export default PregameView;
