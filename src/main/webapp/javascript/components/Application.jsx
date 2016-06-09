import React, { Component } from "react";
import { Grid } from "react-bootstrap";

import Navigation from "./layout/Navigation";
import PageFooter from "./layout/PageFooter";

export class Application extends Component {

    render() {
        const { children } = this.props;

        return (
            <div>
                <Navigation />

                <Grid>
                    {children}
                
                    <PageFooter />
                </Grid>
            </div>
        );
    }

}

export default Application;
