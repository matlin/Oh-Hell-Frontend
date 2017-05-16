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
      <MenuItem href="/login" eventKey="1" >Login</MenuItem>
      <MenuItem href="/logout" eventKey="2" >Logout</MenuItem>
      <MenuItem href="/lobby" eventKey="3" >Lobby</MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NavButton;
