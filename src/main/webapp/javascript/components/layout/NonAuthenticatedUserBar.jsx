import React, { Component } from "react";
import { Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export class NonAuthenticatedUserBar extends Component {

    render() {
        return (
            <Nav pullRight>
                <LinkContainer to="/sign-in"><NavItem eventKey={1}>Sign-In</NavItem></LinkContainer>
                <LinkContainer to="/sign-up"><NavItem eventKey={2}>Sign-Up</NavItem></LinkContainer>
            </Nav>
        );
    }

}

export default NonAuthenticatedUserBar;
