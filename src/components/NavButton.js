import React from "react";
import { Dropdown, MenuItem, Glyphicon } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NavButton(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle>
        <Glyphicon glyph="th-list" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <LinkContainer to="/login">
          <MenuItem eventKey="1">Login</MenuItem>
        </LinkContainer>
        <LinkContainer to="/lobby">
          <MenuItem href="/lobby" eventKey="3">Lobby</MenuItem>
        </LinkContainer>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NavButton;
