import React from 'react';
import './App.css';

import { drumPad, bankPad } from './PadData';

import BankPad from './components/BankPad/BankPad';
class App extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            power: true,
            display: String.fromCharCode(160),
            currentPadBank: drumPad,
            currentPadBankId: 'Heater Kit',
            sliderVal: 0.3
        }
        
        this.displayClipName = this.displayClipName.bind(this);
        this.selectBank = this.selectBank.bind(this);
        this.adjustVolume = this.adjustVolume.bind(this);
        this.powerControl = this.powerControl.bind(this);
        this.clearDisplay = this.clearDisplay.bind(this);
    }
    powerControl() {
        this.setState({
            power: !this.state.power,
            display: String.fromCharCode(160)
        });
    }
    selectBank() {
        if (this.state.power) {
            this.state.currentPadBank === 'Heater Kit' ?
                this.setState({
                    currentPadBank: bankPad,
                    display: 'Smooth Piano Kit',
                    currentPadBankId: 'Smooth Piano Kit'
                }) :
                this.setState({
                    currentPadBank: drumPad,
                    display: 'Heater Kit',
                    currentPadBankId: 'Heater Kit'
                });
        }
    }

    displayClipName(name) {
        if (this.state.power) {
            this.setState({
                display: name
            });
        }
    }

    adjustVolume(e) {
        if (this.state.power) {
            this.setState({
                sliderVal: e.target.value,
                display: `Volume: ${Math.round(e.target.value * 100)}`
            });
            setTimeout(() => this.clearDisplay(), 1000);
        }
    }
    clearDisplay() {
        this.setState({
            display: String.fromCharCode(160)
        });
    }

    render() {
        const powerSlider = this.state.power ? {
            float: 'right'
        } : {
            float: 'left'
        };

        const bankSlider = this.state.currentPadBank === drumPad ? {
            float: 'left'
        } : {
            float: 'right'
        };

        const clips = [].slice.call(document.getElementsByClassName('clip'));

        clips.forEach(sound => {
            sound.volume = this.state.sliderVal
        });

        return (
            <div id="drum-machine" className="inner-container">
                <BankPad
                    power={this.state.power}
                    updateDisplay={this.displayClipName}
                    clipVolume={this.state.sliderVal}
                    currentPadBank={this.state.currentPadBank} />

                <div className="controls-container">
                    <div className="control">
                        <p>Power</p>
                        <div onClick={this.state.powerControl}
                            className="select">
                            <div style={powerSlider} className="inner" />
                        </div>                        
                    </div>

                    <p id="display">{this.state.display}</p>
                    <div className="volume-slider">
                        <input type="range" min="0" max="1" step="0.01" value={this.state.sliderVal} onChange={this.adjustVolume} />
                    </div>

                    <div className="control">
                        <p>Bank</p>
                        <div onClick={this.selectBank} className="select">
                            <div style={bankSlider} className="inner" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;