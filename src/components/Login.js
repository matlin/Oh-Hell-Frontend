import React, { Component } from 'react';
import styled from 'styled-components';
import Server from '../server.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const EmailInput = styled.input`
  display: block;
`;

const PasswordInput = styled.input`
  display: block;
`;


// TODO: add functionality if invalid credientails

class Login extends Component{
  constructor(){
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  handleTextUpdate(event, field){
    this.setState({[field]:event.target.value});
  }

  login(){
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    Server.User.login(user);
  }

  render(){
    const email = (<EmailInput
    type="text"
    size='45'
    value={this.state.email}
    placeholder="Email"
    onChange={(event)=> this.handleTextUpdate(event, 'email')}
    />)

    const password = (<PasswordInput
    type='password'
    size='45'
    value={this.state.password}
    placeholder="Password"
    onChange={(event)=> this.handleTextUpdate(event, 'password')}
    />)

    return(
      <div>
      {email}
      {password}
      <Link to='/lobby'><input type='button' disabled={this.state.email=== '' || this.state.password === ''} onClick={()=> this.login()} value='Login'/></Link>
      </div>
    )
  }
}

export default Login
