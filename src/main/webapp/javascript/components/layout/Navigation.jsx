import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import { IndexLink } from "react-router";

import { connect } from "react-redux";

import AuthenticatedUserBar from "./AuthenticatedUserBar";
import NonAuthenticatedUserBar from "./NonAuthenticatedUserBar";

export class Navigation extends Component {

    render() {
        const { authenticated } = this.props;

        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <IndexLink to="/">Payfirma Coding Exercise</IndexLink>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <IndexLinkContainer to="/">
                        <NavItem eventKey={1}>Shop</NavItem>
                    </IndexLinkContainer>
                </Nav>

                {!authenticated && <NonAuthenticatedUserBar />}
                {authenticated && <AuthenticatedUserBar />}
            </Navbar>
        );
    }

}

export default connect((state) => ({
    authenticated: !!state.get("auth").get("username") && !!state.get("auth").get("password"),
}))(Navigation);
