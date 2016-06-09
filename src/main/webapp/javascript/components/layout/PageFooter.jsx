import React, { Component } from "react";

export class PageFooter extends Component {

    render() {
        const footerStyle = {
            marginTop: 25 + 'px',
            paddingTop: 19 + 'px',
            color: '#777',
            borderTop: '1px solid #e5e5e5',
        };

        return (
            <footer style={footerStyle}>
                <p>© 2016 Florian Krauthan</p>
            </footer>
        );
    }

}

export default PageFooter;
