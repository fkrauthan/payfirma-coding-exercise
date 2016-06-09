import React, { Component } from "react";
import { PageHeader, Row, Col, Button } from "react-bootstrap";

import { connect } from "react-redux";

import { stepSelected as _stepSelected, cpuSelected as _cpuSelected, memSelected as _memSelected, hddSelected as _hddSelected } from "../../redux/orderReducer";

import ConfigurationSelector from "./ConfigurationSelector";
import DisplayAmount from "./DisplayAmount";

export class Order extends Component {

    componentDidMount() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    render() {
        const { laptop, cpuOptions, memOptions, hddOptions, selectedCpu, selectedMem, selectedHdd, cpuSelected, memSelected, hddSelected, goToCollect } = this.props;

        return (
            <div>
                <Row>
                    <Col xs={7} md={8}>
                        <PageHeader>Order Laptop {laptop.get("model")} - Step 1/2</PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col xs={7} md={8}>
                        <ConfigurationSelector label="CPU" options={cpuOptions} activeOption={selectedCpu} onSelect={cpuSelected} />
                        <ConfigurationSelector label="Memory" options={memOptions} activeOption={selectedMem} onSelect={memSelected} />
                        <ConfigurationSelector label="Hard Drive" options={hddOptions} activeOption={selectedHdd} onSelect={hddSelected} />
                    </Col>
                    <Col xs={5} md={4}>
                        <DisplayAmount laptop={laptop} cpu={selectedCpu} mem={selectedMem} hdd={selectedHdd} />

                        <div style={{marginTop: 5 + "em"}}>
                            <Button bsStyle="primary" bsSize="large" block onClick={goToCollect}>Order</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect((state) => ({
    laptop: state.get("order").get("laptop"),

    cpuOptions: state.get("order").get("cpuOptions"),
    memOptions: state.get("order").get("memOptions"),
    hddOptions: state.get("order").get("hddOptions"),

    selectedCpu: state.get("order").get("selectedCpu"),
    selectedMem: state.get("order").get("selectedMem"),
    selectedHdd: state.get("order").get("selectedHdd"),
}), (dispatch) => ({
    load: (id) => dispatch(_load(id)),

    cpuSelected: (cpu) => dispatch(_cpuSelected(cpu)),
    memSelected: (mem) => dispatch(_memSelected(mem)),
    hddSelected: (hdd) => dispatch(_hddSelected(hdd)),

    goToCollect: () => dispatch(_stepSelected(2)),
}))(Order);
