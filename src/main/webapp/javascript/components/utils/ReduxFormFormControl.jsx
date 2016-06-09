import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";

export class ReduxFormFormControl extends Component {

    render() {
        const { label, touched, invalid, error, ...formProps } = this.props;
        if (!formProps.placeholder) {
            formProps.placeholder = label;
        }

        return (
            <FormGroup validationState={touched && invalid ? "error" : null}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl {...formProps} />
                {touched && invalid && (<HelpBlock>{error}</HelpBlock>)}
            </FormGroup>
        );
    }

}

export default ReduxFormFormControl;
