import React from 'react';

import DrumPad from '../DrumPad/DrumPad';
class BankPad extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    // eslint-disable-next-line react/require-render-return
    render() {
        let bankPad;
        this.props.power
            ?
            bankPad = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
                return (
                    <DrumPad
                        clipId={padBankArr[i].id}
                        clip={padBankArr[i].url}
                        keyTrigger={padBankArr[i].keyTrigger}
                        keyCode={padBankArr[i].keyCode}
                        updateDisplay={this.props.updateDisplay}
                        power={this.props.power} />
                );
            }) : 
            bankPad = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
                return (
                    <DrumPad
                        clipId={padBankArr[i].id}
                        clip="#"
                        keyTrigger={padBankArr[i].keyTrigger}
                        keyCode={padBankArr[i].keyCode}
                        updateDisplay={this.props.updateDisplay}
                        power={this.props.power} />
                );
            });

            return (
                <div className="pad-bank">
                    {bankPad}
                </div>
            );
    }
}

export default BankPad;