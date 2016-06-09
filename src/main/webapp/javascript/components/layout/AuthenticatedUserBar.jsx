import React, { Component } from "react";
import { Nav, NavItem } from "react-bootstrap";

import { connect } from "react-redux";

import { signOut as _signOut } from "../../redux/authReducer";

export class AuthenticatedUserBar extends Component {

    render() {
        const { signOut } = this.props;

        return (
            <Nav pullRight>
                <NavItem eventKey={1} onClick={signOut}>Sign-Out</NavItem>
            </Nav>
        );
    }

}

export default connect(() => ({}), (dispatch) => ({
    signOut: () => dispatch(_signOut()),
}))(AuthenticatedUserBar);
