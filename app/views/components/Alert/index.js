'use strict'
import React, { Component } from 'react';
import AlertUI from 'react-native-alertui';

class Alert extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            show: false,
            config: undefined
        }
    }
    show(config) {
        config.buttons && config.buttons.map( (button) =>{
            var onPress = button.onPress;
            button.onPress =  () =>{
                onPress && onPress();
                this._close();
            }
        })
        this.setState({
            show: true,
            config
        });
    }
    _close() {
        this.setState({
            show: false,
            config: undefined
        });
    }
    render() {
        if (this.state.show) {
            return <AlertUI {...this.state.config} />
        }
        return null;
    }
}

export default Alert;