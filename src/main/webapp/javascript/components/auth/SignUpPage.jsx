import React, { Component } from "react";
import { PageHeader, Form, Alert, Button } from "react-bootstrap";

import { reduxForm } from "redux-form";

import ReduxFormFormControl from "../utils/ReduxFormFormControl";
import { signUp as _signUp } from "../../redux/authReducer";

export class SignUpPage extends Component {

    render() {
        const { signUp, fields: { username, password, passwordRepeated, email, firstName, lastName }, submitting, submitFailed, error, handleSubmit } = this.props;

        return (
            <div>
                <PageHeader>Sign-Up</PageHeader>

                <Form onSubmit={handleSubmit(signUp)}>
                    {submitFailed && !!error && (<Alert bsStyle="danger">{error}</Alert>)}

                    <fieldset>
                        <legend>Account</legend>

                        <ReduxFormFormControl label="Username" {...username} />
                        <ReduxFormFormControl label="Email" type="email" {...email} />
                    </fieldset>

                    <fieldset>
                        <legend>Password</legend>

                        <ReduxFormFormControl label="Password" type="password" {...password} />
                        <ReduxFormFormControl label="Password Repeated" type="password" {...passwordRepeated} />
                    </fieldset>

                    <fieldset>
                        <legend>Profile</legend>

                        <ReduxFormFormControl label="First Name" {...firstName} />
                        <ReduxFormFormControl label="Last Name" {...lastName} />
                    </fieldset>

                    <div className="text-right">
                        <Button type="submit" bsStyle="primary" disabled={submitting}>Submit</Button>
                    </div>
                </Form>
            </div>
        );
    }

}

function validate(data) {
    const errors = {};

    if (!data.username) {
        errors.username = "is required!";
    }
    if (!data.password) {
        errors.password = "is required!";
    }
    if (!data.passwordRepeated) {
        errors.passwordRepeated = "is required!";
    }
    if (!data.email) {
        errors.email = "is required!";
    }
    if (!data.firstName) {
        errors.firstName = "is required!";
    }
    if (!data.lastName) {
        errors.lastName = "is required!";
    }

    if (!!data.password && !!data.passwordRepeated && data.password !== data.passwordRepeated) {
        errors.passwordRepeated = "passwords do not match!";
    }

    if (!!data.email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!regex.test(data.email)) {
            errors.email = "is not a valid email address!";
        }
    }

    return errors;
}

export default reduxForm({
    form: "signUp",
    fields: ["username", "password", "passwordRepeated", "email", "firstName", "lastName"],
    validate,

    getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
}, () => ({}), (dispatch) => ({
    signUp: (data) => dispatch(_signUp(data)),
}))(SignUpPage);
