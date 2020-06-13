import React from 'react';

import { activeStyle, inactiveStyle } from '../../PadData';

class DrumPad extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            padStyle: inactiveStyle
        };
        this.play = this.play.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.activatePad = this.activatePad.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(event) {

        if (event.keyCode === this.props.keyCode) {
            this.play();
        }
    }

    activatePad() {
        if (this.props.power) {
            this.state.padStyle.backgroundColor === 'orange'
                ?
                this.setState({
                    padStyle: inactiveStyle
                }) : this.setState({
                    padStyle: activeStyle
                });
        } else {
            this.state.padStyle.marginTop === 13
                ?
                this.setState({
                    padStyle: inactiveStyle
                }) : this.setState({
                    padStyle: {
                        height: 77,
                        marginTop: 13,
                        backgroundColor: 'grey',
                        boxShadow: "0 3px grey"
                    }
                });
        }
    }

    play(e) {
        const sound = document.getElementById(this.props.keyTrigger);
        sound.currentTime = 0;
        sound.play();
        this.activatePad();
        setTimeout(() => this.activatePad(), 100);

        this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
    }

    render() {
        return (
            <div id={this.props.clipId}
            onClick={this.play}
            className="drum-pad"
            style={this.state.padStyle}>
                <audio className="clip" id={this.props.keyTrigger} src={this.props.clip}></audio>
                {this.props.keyTrigger}
            </div>
        );
    }
}

export default DrumPad;