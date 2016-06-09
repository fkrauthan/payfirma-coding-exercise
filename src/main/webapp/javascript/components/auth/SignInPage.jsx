import React, { Component } from "react";
import { PageHeader, Form, Button, Alert } from "react-bootstrap";

import { reduxForm } from "redux-form";

import ReduxFormFormControl from "../utils/ReduxFormFormControl";
import { signIn as _signIn } from "../../redux/authReducer";

export class SignInPage extends Component {

    render() {
        const { signIn, fields: { username, password }, submitting, submitFailed, error, handleSubmit, location } = this.props;

        let target = "/";
        if (!!location.state && !!location.state.nextPathname) {
            target = location.state.nextPathname;
        }

        return (
            <div>
                <PageHeader>Sign-In</PageHeader>

                <Form onSubmit={handleSubmit((data) => signIn(data, target))}>
                    {submitFailed && !!error && (<Alert bsStyle="danger">{error}</Alert>)}

                    <ReduxFormFormControl label="Username" {...username} />
                    <ReduxFormFormControl label="Password" type="password" {...password} />

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

    return errors;
}

export default reduxForm({
    form: "signIn",
    fields: ["username", "password"],
    validate,

    getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
}, () => ({}), (dispatch) => ({
    signIn: (data, target) => dispatch(_signIn(data, target)),
}))(SignInPage);
