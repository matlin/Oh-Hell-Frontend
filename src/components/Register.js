import React, { Component } from "react";
import styled from "styled-components";
import Server from "../server.js";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  ListGroupItem,
  Button,
  Form,
  ControlLabel,
  FormControl
} from "react-bootstrap";

const LobbyHeader = styled.h1`
  color: lightgrey;
`;

const HeaderPanel = styled(ListGroupItem)`
  text-align: center;
  background-color: #751010;
  border:none;
`;

const StyledButton = styled(Button)`
  marginTop: 5px;
  marginRight: 5px;
  background-color: #751010;
  color: lightgrey;
`;

const StyledLink = styled(Link)`
  vertical-align: -webkit-baseline-middle;
`;

// TODO: add functionality if account already exists for given email
class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: ""
    };
  }

  // helper function for easy state updating
  handleTextUpdate(event, field) {
    this.setState({ [field]: event.target.value });
  }

  //pulls information from state and makes request to API
  register() {
    const user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };
    Server.User.register(user).then(res => {
      this.props.setUser(res.user);
    });
  }

  render() {
    return (
      <div className="overlay" style={{ margin: "0 auto", maxWidth: "650px" }}>
        <HeaderPanel>
          <LobbyHeader>Oh Hell!</LobbyHeader>
        </HeaderPanel>
        <ListGroupItem className="overlay">
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
            <div style={{ marginTop: "10px" }}>
              <ControlLabel>Username</ControlLabel>
              <FormControl
                type="text"
                value={this.state.username}
                placeholder=""
                onChange={event => this.handleTextUpdate(event, "username")}
              />
            </div>
            <div style={{ marginTop: "10px", marginBottom: "5px" }}>
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                value={this.state.password}
                placeholder=""
                onChange={event => this.handleTextUpdate(event, "password")}
              />
            </div>
          </Form>
          <Link to="/lobby">
            <StyledButton
              disabled={
                this.state.username.trim() === "" ||
                  this.state.email.trim() === "" ||
                  this.state.password.trim() === ""
              }
              onClick={() => this.register()}
            >
              Register
            </StyledButton>
          </Link>
          <StyledLink to="/login">
            Already Registered?
          </StyledLink>
        </ListGroupItem>
      </div>
    );
  }
}

Register.propTypes = {
  setUser: PropTypes.func.isRequired
};

export default Register;
