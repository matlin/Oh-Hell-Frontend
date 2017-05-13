import React, { Component } from 'react';
import styled from 'styled-components';
import Server from '../server.js';
import {
  Redirect
} from 'react-router-dom'

const EmailInput = styled.input`
  display: block;
`;

const PasswordInput = styled.input`
  display: block;
`;


// TODO: add functionality if invalid credientails

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  componentDidMount(){
    if (document.cookie.indexOf('id') !== -1){
      this.login();
    }
  }

  handleTextUpdate(event, field){
    this.setState({[field]:event.target.value});
  }

  login(){
    if (this.state.email && this.state.password){
      const user = {
        email: this.state.email,
        password: this.state.password
      }
      Server.User.login(user).then(response => {
        console.log("Login response", response);
        if (response.user){
          this.props.setUser(response.user);
          this.props.redirect();
        }else{
          window.alert('Either password or username is incorrect');
        }
      });
    }else{
      Server.User.login().then(response => {
        if (response.user){
          this.props.setUser(response.user);
          this.props.redirect();
        }
      });
    }
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
      <input type="button" disabled={this.state.email=== '' || this.state.password === ''} onClick={()=> this.login()} value="Login"/>
      </div>
    );
  }
}

export default Login
