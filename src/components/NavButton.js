import styled from "styled-components";
import React, { Component } from "react";
import { Dropdown, MenuItem, Glyphicon } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function NavButton(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle>
        <Glyphicon glyph="th-list" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Link to="/login"><MenuItem eventKey="1" active>Login</MenuItem></Link>
        <Link to="/logout"><MenuItem eventKey="2" active>Logout</MenuItem></Link>
        <Link to="/lobby"><MenuItem eventKey="3" active>Lobby</MenuItem></Link>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NavButton;
