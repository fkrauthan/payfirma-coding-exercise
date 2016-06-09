import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import accounting from "accounting";

export class ConfigurationOption extends Component {

    state = {
        hovered: false,
    };

    setHovered(hovered) {
        this.setState({
            hovered,
        });
    }

    renderAmount() {
        const { option, active, activeOption } = this.props;

        if (active) {
            return (
                <strong>{accounting.formatMoney(option.get("amount") / 100)}</strong>
            );
        }

        if (option.get("amount") > activeOption.get("amount")) {
            return (
                <strong style={{color: "red"}}>{accounting.formatMoney((option.get("amount") - activeOption.get("amount")) / 100)}</strong>
            );
        } else {
            return (
                <strong style={{color: "green"}}>{accounting.formatMoney((option.get("amount") - activeOption.get("amount")) / 100)}</strong>
            );
        }
    }

    render() {
        const { option, active, onClick } = this.props;
        const { hovered } = this.state;

        const style = {
            border: "1px solid",
            borderColor: active ? "#ffa500" : "black",
            padding: 10 + "px",
            margin: 5 + "px",
        };
        if (hovered) {
            style.backgroundColor = "#f4f4f4";
            style.cursor = "pointer";
        }

        return (
            <div style={style} onMouseEnter={() => this.setHovered(true)} onMouseLeave={() => this.setHovered(false)} onClick={() => onClick(option)}>
                <Row>
                    <Col xs={6}>
                        <strong>{option.get("name")}</strong>
                    </Col>
                    <Col xs={6} className="text-right">
                        {this.renderAmount()}
                    </Col>
                </Row>
            </div>
        );
    }

}

export default ConfigurationOption;
