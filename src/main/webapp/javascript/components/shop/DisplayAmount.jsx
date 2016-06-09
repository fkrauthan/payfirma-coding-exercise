import React, { Component } from "react";

import accounting from "accounting";

export class DisplayAmount extends Component {

    render() {
        const { laptop, cpu, mem, hdd } = this.props;

        const totalAmount = laptop.get("amount") + cpu.get("amount") + mem.get("amount") + hdd.get("amount");

        return (
            <div>
                <fieldset>
                    <legend>Base Price</legend>

                    <dl className="dl-horizontal">
                        <dt>Laptop</dt>
                        <dd className="text-right">{accounting.formatMoney(laptop.get("amount") / 100)}</dd>
                    </dl>
                </fieldset>

                <fieldset style={{marginTop: 20 + "px"}}>
                    <legend>Configurations</legend>

                    <dl className="dl-horizontal">
                        <dt>CPU</dt>
                        <dd>
                            <div><em>{cpu.get("name")}</em></div>
                            <div className="text-right">{accounting.formatMoney(cpu.get("amount") / 100)}</div>
                        </dd>
                    </dl>

                    <dl className="dl-horizontal">
                        <dt>Memory</dt>
                        <dd>
                            <div><em>{mem.get("name")}</em></div>
                            <div className="text-right">{accounting.formatMoney(mem.get("amount") / 100)}</div>
                        </dd>
                    </dl>

                    <dl className="dl-horizontal">
                        <dt>Hard Drive</dt>
                        <dd>
                            <div><em>{hdd.get("name")}</em></div>
                            <div className="text-right">{accounting.formatMoney(hdd.get("amount") / 100)}</div>
                        </dd>
                    </dl>
                </fieldset>

                <fieldset style={{marginTop: 20 + "px"}}>
                    <legend>Total</legend>
                    <div className="text-right">
                        <strong>{accounting.formatMoney(totalAmount / 100)}</strong>
                    </div>
                </fieldset>
            </div>
        );
    }
    
}

export default DisplayAmount;
