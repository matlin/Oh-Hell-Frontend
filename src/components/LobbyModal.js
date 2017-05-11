import React, {Component} from 'react';
import Server from '../server.js';
import { Button, Modal, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
class LobbyModal extends Component {
  constructor(){
    super();
    this.state = {
      gameName: '',
      password: ''
    }
  }

  handleTextUpdate(event, field){
    this.setState({[field]: event.target.value});
  }

  render(){
    return(
      <Modal show={this.props.showModal} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Create a Game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <ControlLabel>Game Name</ControlLabel>
              <FormControl
                type="text"
                value={this.state.gameName}
                placeholder=""
                onChange={(event)=>this.handleTextUpdate(event, 'gameName')}
              />
              <ControlLabel>Password (Optional)</ControlLabel>
              <FormControl
                type="text"
                value={this.state.password}
                placeholder=""
                onChange={(event)=>this.handleTextUpdate(event, 'password')}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                Server.Game.createGame({gameName: this.state.gameName, password: this.state.password});
                this.props.close();
              }}>Submit</Button>
            <Button onClick={this.props.close}>Cancel</Button>
          </Modal.Footer>
        </Modal>
    )
  }
}

export default LobbyModal;
