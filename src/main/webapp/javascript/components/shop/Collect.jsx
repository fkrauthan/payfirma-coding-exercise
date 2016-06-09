import React, { Component } from "react";
import { PageHeader, Row, Col, Button } from "react-bootstrap";

import { connect } from "react-redux";

import { stepSelected as _stepSelected } from "../../redux/orderReducer";

import DisplayAmount from "./DisplayAmount";
import PayfirmaForm from "./PayfirmaForm";

export class Collect extends Component {

    componentDidMount() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    render() {
        const { laptop, selectedCpu, selectedMem, selectedHdd, changeOrder } = this.props;

        return (
            <div>
                <Row>
                    <Col xs={7} md={8}>
                        <PageHeader>Order Laptop {laptop.get("model")} - Step 2/2</PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col xs={7} md={8}>
                        <p>Please enter your credit card details to finish your order!</p>

                        <PayfirmaForm />
                    </Col>
                    <Col xs={5} md={4}>
                        <DisplayAmount laptop={laptop} cpu={selectedCpu} mem={selectedMem} hdd={selectedHdd} />

                        <div style={{marginTop: 5 + "em"}}>
                            <Button bsSize="large" block onClick={changeOrder}>Change</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect((state) => ({
    laptop: state.get("order").get("laptop"),

    selectedCpu: state.get("order").get("selectedCpu"),
    selectedMem: state.get("order").get("selectedMem"),
    selectedHdd: state.get("order").get("selectedHdd"),
}), (dispatch) => ({
    changeOrder: () => dispatch(_stepSelected(1)),
}))(Collect);
