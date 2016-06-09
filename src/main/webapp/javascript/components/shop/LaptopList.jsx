import React, { Component } from "react";
import { Alert, Button, Row } from "react-bootstrap";
import Loader from "react-loader";

import { connect } from "react-redux";

import { load as _load } from "../../redux/storeReducer";

import Laptop from "./Laptop";

export class LaptopList extends Component {

    componentWillMount() {
        const { laptops, load } = this.props;
        if (laptops.length === 0) {
            load();
        }
    }

    render() {
        const { loading, error, laptops, load } = this.props;
        
        return (
            <Loader loaded={!loading}>
                {!!error && (<Alert bsStyle="danger"><strong>Error!</strong> {error}</Alert>)}
                {laptops.length === 0 && (<Button onClick={load}>Retry Loading!</Button>)}

                {laptops.length > 0 && (
                    <Row>
                        {laptops.map((laptop) => (<Laptop key={laptop.get("id")} laptop={laptop} />))}
                    </Row>
                )}
            </Loader>
        );
    }

}

export default connect((store) => ({
    loading: store.get("store").get("loading"),
    error: store.get("store").get("error"),
    laptops: store.get("store").get("laptops").toArray(),
}), (dispatch) => ({
    load: () => dispatch(_load()),
}))(LaptopList);
