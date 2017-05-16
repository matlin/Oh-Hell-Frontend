import React, {Component} from 'react';
import Server from '../server.js';
import styled from "styled-components";
import { Button, Modal, Form, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';

const StyledHeader = styled(Modal.Header)`
  background-color: #751010;
`;

const StyledTitle = styled(Modal.Title)`
  color: lightgrey;
`;

class LobbyModal extends Component {
  constructor(){
    super();
    this.state = {
      gameName: '',
      password: '',
      private: false
    }
  }

  handleTextUpdate(event, field){
    this.setState({[field]: event.target.value});
  }

  render(){
    let passwordField;
    if (this.state.private) {
      passwordField = (
      <div>
        <ControlLabel>Password</ControlLabel>
        <FormControl
          type="password"
          value={this.state.password}
          placeholder=""
          onChange={(event)=>this.handleTextUpdate(event, 'password')}/>
      </div>)
    } else {
      passwordField = null;
    }
    return(
      <Modal show={this.props.showModal} onHide={this.props.close}>
          <StyledHeader closeButton>
            <StyledTitle>Create a Game</StyledTitle>
          </StyledHeader>
          <Modal.Body>
            <Form>
              <ControlLabel>Game Name</ControlLabel>
              <FormControl
                type="text"
                value={this.state.gameName}
                placeholder=""
                onChange={(event)=>this.handleTextUpdate(event, 'gameName')}
              />
            <Checkbox checked={(this.state.private ? true: false)} onChange={() => this.setState({private: !this.state.private})}>Private</Checkbox>
            {passwordField}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" disabled={this.state.gameName.trim() === '' || (this.state.private && this.state.password.trim() === '')}
              onClick={() => this.props.submit({gameName: this.state.gameName, password: this.state.private ? this.state.password : ''})
              }>Submit</Button>
            <Button onClick={this.props.close}>Cancel</Button>
          </Modal.Footer>
        </Modal>
    )
  }
}

export default LobbyModal;
