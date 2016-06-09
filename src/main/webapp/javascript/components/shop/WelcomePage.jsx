import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";

import LaptopList from "./LaptopList";

export class WelcomePage extends Component {

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Welcome!</h1>
                    <p>Please check out our amazing offerings!</p>
                </Jumbotron>

                <LaptopList />
            </div>
        );
    }

}

export default WelcomePage;
