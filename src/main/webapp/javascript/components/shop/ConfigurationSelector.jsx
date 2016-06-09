import React, { Component } from "react";

import ConfigurationOption from "./ConfigurationOption";

export class ConfigurationSelector extends Component {

    render() {
        const { label, options, activeOption, onSelect } = this.props;

        return (
            <div style={{marginBottom: 25 + "px"}}>
                <legend>{label}</legend>

                <div>
                    {options.map((option) => (<ConfigurationOption onClick={onSelect} key={option.get("id")} option={option} activeOption={activeOption} active={option === activeOption} />))}
                </div>
            </div>
        );
    }

}

export default ConfigurationSelector;
