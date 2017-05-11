import React, { Component } from 'react';
import styled from 'styled-components'
import Server from '../server.js'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const UsernameInput = styled.input`
  display: block;
`;

const PasswordInput = styled.input`
  display: block;
`;

const EmailInput = styled.input`
  display: block;
`;

// TODO: add functionality if account already exists for given email
class Register extends Component{
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      email: ''
    }
  }

  handleTextUpdate(event, field){
    this.setState({[field]:event.target.value});
  }

  register(){
    const user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    }
    console.log(user);
    Server.User.register(user);
  }

  render(){
    const username = (<UsernameInput
    type="text"
    size='45'
    value={this.state.username}
    placeholder="Username"
    onChange={(event)=> this.handleTextUpdate(event, 'username')}
    />)

    const password = (<PasswordInput
    type='password'
    size='45'
    value={this.state.password}
    placeholder="Password"
    onChange={(event)=> this.handleTextUpdate(event, 'password')}
    />)

    const email = (<EmailInput
    type="text"
    size='45'
    value={this.state.email}
    placeholder="Email"
    onChange={(event)=> this.handleTextUpdate(event, 'email')}
    />)

    return(
      <div>
      {username}
      {password}
      {email}
      <Link to='/lobby'><input type='button' disabled={this.state.username === '' || this.state.email=== '' || this.state.password === ''} onClick={()=> this.register()} value="Register"/></Link>
      </div>
    )
  }
}

export default Register
