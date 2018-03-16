'use strict'
import Modal from 'react-native-modalui';
import React, { Component } from 'react';

class PopupModal extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            show: ture
        }
    }
    _onBackPress = () => {
        this.props.onBackPress && this.props.onBackPress(this.props.id, this);
    }
    _onBackdropPress = () => {
        this.props.onBackdropPress && this.props.onBackdropPress(this.props.id, this);
    }
    _onModalShow = () => {
        this.props.onModalShow && this.props.onModalShow(this.props.id, this);
    }
    _onModalClose = () => {
        this.props.onModalClose && this.props.onModalClose(this.props.id, this);
    }

    hide() {
        this.setState({ show: false })
    }
    render() {
        return <Modal
            style={this.props.style}
            duration={this.props.duration}
            children={this.props.children}
            easing={this.props.easing}
            animationType={this.props.animationType}
            onModalShow = { this._onModalShow }
            onModalClose={this._onModalClose}
            onBackPress={this._onBackPress}
            onBackdropPress={this._onBackdropPress}
            isVisible={this.state.show}
        />
    }
}
export default PopupModal;