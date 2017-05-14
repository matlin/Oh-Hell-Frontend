import React, {Component} from 'react';
import Server from '../server.js';
import { Button, Modal, Form, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';
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
          type="text"
          value={this.state.password}
          placeholder=""
          onChange={(event)=>this.handleTextUpdate(event, 'password')}/>
      </div>)
    } else {
      passwordField = null;
    }
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
