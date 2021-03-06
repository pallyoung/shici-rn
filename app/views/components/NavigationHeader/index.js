import React, { Component } from 'react';
import { Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { autoSize,Theme } from 'react-native-improver';

import Icon from './../Icon';
import { View, Text, TouchableOpacity, Image } from 'react-native';
const IOS = Platform.OS === 'ios';
const currentTheme = Theme.getTheme();

class Button extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        var type = this.props.type;
        var styles = {
            left: {
                // left: 20,
                justifyContent: 'flex-start',
            },
            right: {
                // right: 20,
                justifyContent: 'flex-end',
            },
            back: {
                // left: 0,
                justifyContent: 'flex-start',
            }
        }
        return <View
            style={{
                flexDirection: 'row',
                // position: 'absolute',
                // top: IOS?20:0,
                // bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                ...styles[type]
            }}>
            {this.props.children}
        </View>
    }
}
class Title extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        return <View
            style={{
                // position: 'absolute',
                // top: IOS?20:0,
                // bottom: 0,
                // left: 60,
                // right: 60,
                flex:1,
                paddingLeft:12,
                overflow: 'hidden',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
            {this.props.children}
        </View>
    }
}
export default class Header extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            title: this.props.title,
            canGoBack: false,
            show: this.props.header === null ? false : true,
            leftButton: this.props.leftButton,
            rightButton: this.props.rightButton
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.title !== this.props.title) {
            this.state.title = nextProps.title;
        }
        if (nextProps.leftButton !== this.props.leftButton) {
            this.state.leftButton = nextProps.leftButton;
        }
        if (nextProps.rightButton !== this.props.rightButton) {
            this.state.rightButton = nextProps.rightButton;
        }
    }

    update(info) {
        this.setState(info);
    }
    _renderLeftButton() {
        var leftButton;
        var headerProps = this.props.getHeaderProps();
        var navigation = this.props.navigation;
        if (typeof this.state.leftButton === 'object') {
            return <Button
                type='left'
                children={this.state.leftButton} />;
        } else if ((headerProps.scene.index !== 0 || APPContext.isLoginPopupShow)) {
            return <Button
                type='back'
                children={this._backButton(headerProps, navigation)} />;
        }
        return null;
    }
    _backButton(headerProps, navigation) {
        return (
            <TouchableOpacity
                style={{ justifyContent: 'center',flexDirection:'row', paddingLeft:20 }}
                onPress={headerProps.scene.index !== 0 ? () => navigation.goBack() : () => APPContext.hideLoginPopup()}>
                <Icon
                    name='ios-arrow-round-back-outline'
                    style={{
                        color: '#333',
                        fontSize: 28,
                    }} />
            </TouchableOpacity >
        );
    }
    _renderRightButton() {
        if (typeof this.state.rightButton === 'object') {
            return <Button
                type='right'
                children={this.state.rightButton} />;
        } else {
            return null;
        }
    }
    _renderTitle() {
        var child;
        if (typeof this.state.title === 'function') {
            child = this.state.title;
        } else {
            child = <Text style={[{ fontSize: 14, color: '#333',fontWeight:'200' }, this.props.titleStyle]}>{this.state.title}</Text>
        }
        return <Title>{child}</Title>
    }
    render() {
        if (!this.state.show) {
            return null;
        }
        return <View
            style={[
                currentTheme.header,
                this.props.style,
                {
                    height: IOS ? 64 : 44,
                    flexDirection: 'row',
                    paddingTop: IOS ? 20 : 0,
                }
            ]}>
            {this._renderLeftButton()}
            {this._renderTitle()}
            {this._renderRightButton()}
        </View>
    }
}
