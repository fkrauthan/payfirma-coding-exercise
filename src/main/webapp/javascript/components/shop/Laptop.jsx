import React, { Component } from "react";
import { Col, Thumbnail, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import accounting from "accounting";

export class Laptop extends Component {

    render() {
        const { laptop } = this.props;

        return (
            <Col xs={6} md={4}>
                <Thumbnail src="http://placehold.it/360x200" alt="360x200">
                    <h3>{laptop.get("model")}</h3>
                    <p>{laptop.get("description")}</p>

                    <p>
                        <LinkContainer to={`order/${laptop.get("id")}`}>
                            <Button bsStyle="primary">Starting @ {accounting.formatMoney(laptop.get("amount") / 100)}</Button>
                        </LinkContainer>
                    </p>
                </Thumbnail>
            </Col>
        );
    }

}

export default Laptop;
