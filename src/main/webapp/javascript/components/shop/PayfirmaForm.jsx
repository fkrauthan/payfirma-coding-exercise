import React, { Component } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";

import { reduxForm } from "redux-form";

import config from "../../config";

import ReduxFormFormControl from "../utils/ReduxFormFormControl";

export class PayfirmaForm extends Component {

    state = {
        scriptLoaded: false,
        error: null,
    };

    componentDidMount() {
        // Load payfirma code
        this.scriptEl = this._getScript("http://www.payfirma.com/media/payfirma.minified.js", () => this.setState({
            scriptLoaded: true,
        }));
    }

    componentWillUnmount() {
        // Remove widget from JS scope
        delete window.Payfirma;

        // Remove javascript file
        if (this.scriptEl) {
            document.querySelector("head").removeChild(this.scriptEl);
            delete this.scriptEl;
        }
    }

    _getScript(src, callback) {
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onreadystatechange = s.onload = () => {
            if (!callback.done && (!s.readyState || /loaded|complete/.test(s.readyState))) {
                callback.done = true;
                callback();
            }
        };
        document.querySelector("head").appendChild(s);
        return s;
    }

    submitData(data) {
        const expiryRegex = /^([0-9]{1,2})\/([0-9]{1,2})$/;
        const expiryMatch = expiryRegex.exec(data.cardExpiry);

        this.setState({
            error: null,
        });

        new Payfirma(config.payfirmaKey, {
            "card_number": data.cardNumber,
            "card_expiry_month": expiryMatch[1],
            "card_expiry_year": expiryMatch[2],
            "cvv2": data.securityCode,
        }, {
            "first_name": data.firstName,
            "last_name": data.lastName,
        }, config.payfirmaCallbackUrl, (response) => {
            const responseObj = JSON.parse(response);
            if(responseObj.result == "approved") {
                console.log("We are approved");
                // TODO call our callback submit data to server
            } else {
                this.setState({
                    error: "Payment declined: please check fields and try again",
                });
            }
        });
    }

    render() {
        const { fields: { firstName, lastName, cardNumber, securityCode, cardExpiry }, handleSubmit } = this.props;
        const { scriptLoaded, error } = this.state;

        return (
            <div>
                <Form onSubmit={handleSubmit((data) => this.submitData(data))}>
                    {!!error && (<Alert bsStyle="danger">{error}</Alert>)}

                    <Row>
                        <Col md={6}>
                            <ReduxFormFormControl label="Card Holder First Name" {...firstName} />
                        </Col>
                        <Col md={6}>
                            <ReduxFormFormControl label="Card Holder Last Name" {...lastName} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <ReduxFormFormControl label="Card Number" placeholder="4111 1111 1111 1111" {...cardNumber} />
                        </Col>
                        <Col md={4}>
                            <ReduxFormFormControl label="Security Code" placeholder="123" {...securityCode} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <ReduxFormFormControl label="Card Expiry" placeholder="12/34" {...cardExpiry} />
                        </Col>
                    </Row>

                    <Button type="submit" bsStyle="success" disabled={!scriptLoaded}>Buy Now!</Button>
                </Form>
            </div>
        );
    }
}

function validate(data) {
    const errors = {};

    if (!data.firstName) {
        errors.firstName = "is required!";
    }
    if (!data.lastName) {
        errors.lastName = "is required!";
    }
    if (!data.cardNumber) {
        errors.cardNumber = "is required!";
    }
    if (!data.securityCode) {
        errors.securityCode = "is required!";
    }
    if (!data.cardExpiry) {
        errors.cardExpiry = "is required!";
    } else if (!/^[0-9]{1,2}\/[0-9]{1,2}$/.test(data.cardExpiry)) {
        errors.cardExpiry = "invalid format! Needs to be MM/YY!";
    }

    return errors;
}

export default reduxForm({
    form: "payfirmaForm",
    fields: ["firstName", "lastName", "cardNumber", "securityCode", "cardExpiry"],
    validate,

    getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
}, () => ({}), (dispatch) => ({
}))(PayfirmaForm);
