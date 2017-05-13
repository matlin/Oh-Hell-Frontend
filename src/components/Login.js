import React, { Component } from "react";
import styled from "styled-components";
import Server from "../server.js";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const LobbyHeader = styled.h1`
  color: white;
`;

const HeaderPanel = styled(ListGroupItem)`
  text-align: center;
  background-color: #34495E;
`;

const StyledButton = styled(Button)`
  margin-top: 5px;
  margin-right: 5px;
  background-color: #34495E;
  color: white;
`;

const StyledLink = styled(Link)`
  vertical-align: -webkit-baseline-middle;
`;

// TODO: add functionality if invalid credientails

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleTextUpdate(event, field) {
    this.setState({ [field]: event.target.value });
  }

  login() {
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    Server.User.login(user);
  }

  render() {
    return (
      <div style={{ margin: "0 auto", maxWidth: "650px" }}>
        <HeaderPanel>
          <LobbyHeader>Oh Hell!</LobbyHeader>
        </HeaderPanel>
        <ListGroupItem>
          <Form>
            <div>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="text"
                value={this.state.email}
                placeholder=""
                onChange={event => this.handleTextUpdate(event, "email")}
              />
            </div>
            <div style={{"margin-top": "10px","margin-bottom": "5px" }}>
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="text"
                value={this.state.password}
                placeholder=""
                onChange={event => this.handleTextUpdate(event, "password")}
              />
            </div>
          </Form>

          <Link to="/lobby">
            <StyledButton
              disabled={this.state.email === "" || this.state.password === ""}
              onClick={() => this.login()}>
              Login
            </StyledButton>
          </Link>
          <StyledLink to="/register">
              Not Registered?
          </StyledLink>
        </ListGroupItem>
      </div>
    );
  }
}

export default Login;
