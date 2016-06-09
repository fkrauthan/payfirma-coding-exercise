import React, { Component } from "react";
import { PageHeader } from "react-bootstrap";

import { connect } from "react-redux";

import { load as _load } from "../../redux/orderReducer";

import Order from "./Order";
import Collect from "./Collect";

export class OrderPage extends Component {

    componentWillMount() {
        const { routeParams: { laptopId }, load } = this.props;
        load(laptopId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.routeParams.laptopId !== nextProps.routeParams.laptopId) {
            nextProps.load(nextProps.routeParams.laptopId);
        }
    }

    render() {
        const { laptop, step } = this.props;
        return (
            <div>
                {!laptop && (<PageHeader>Order Laptop</PageHeader>)}

                {!!laptop && (
                    <div>
                        {step === 1 && <Order />}
                        {step === 2 && <Collect />}
                    </div>
                )}
            </div>
        );
    }

}

export default connect((state) => ({
    laptop: state.get("order").get("laptop"),
    step: state.get("order").get("step"),
}), (dispatch) => ({
    load: (id) => dispatch(_load(id)),
}))(OrderPage);
