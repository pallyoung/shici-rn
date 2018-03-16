/**
 * @filename - node_modules/react-native-router/src/Toast.js
 * @description - $(currentFile)
 */
'use strict'
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    PixelRatio
} from 'react-native';
import PropTypes from 'prop-types';

const LONG = 6000;
const SHORT = 1500;
const POSITION = {
    TOP:'TOP',
    BOTTOM:'BOTTOM',
    CENTER:'BOTTOM'
}
let window = Dimensions.get('window');

class Toast extends Component {
    static LONG = LONG;
    static SHORT = SHORT;
    static POSITION = POSITION;
    static defaultProps = {
        position:POSITION.BOTTOM
    }
    constructor(...props) {
        super(...props);
        this.state = {
            isShow: false,
            message: '',
        }
    }
    show(message, callback, duration) {
        if(typeof callback === 'number'){
            duration = callback;
            callback = undefined;
        }
        this._closeTimeout != undefined && clearTimeout(this._closeTimeout);

        this.setState({
            show: true,
            message
        });

        this._closeTimeout = setTimeout(() => {
            this._close()
            callback && callback();
        }, duration || SHORT);
    }
    _close() {
        this.setState({
            show: false,
            message: ''
        });
        this._closeTimeout = undefined;
    }
    componentWillUnmount() {
        this._closeTimeout != undefined && clearTimeout(this._closeTimeout);
    }

    render() {
        var position = {};
        switch (this.props.position){
            case POSITION.BOTTOM:
                position = {bottom:window.height/3}
                break;
            case POSITION.CENTER:
                position = {top:window.height/2.5}
                break;
            case POSITION.TOP:
                position = {top:window.height/3}
                break;
        }
        if (this.state.show) {
            return (
                <View style={[styles.wrapper,position]}>
                    <Text style={[styles.message]}>{this.state.message}</Text>
                </View>
            );
        }
        return null;
    }
}
const TOAST_WIDTH = PixelRatio.roundToNearestPixel(window.width / 375 * 250);

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left:PixelRatio.roundToNearestPixel((window.width - TOAST_WIDTH)/2),
        width:TOAST_WIDTH,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 4,
    },
    message: {
        color: '#fff',
        fontSize: 15 * window.fontScale,
        textAlign: 'center',
        marginVertical: PixelRatio.roundToNearestPixel(window.width / 375 * 10),
    }
});

export default Toast;