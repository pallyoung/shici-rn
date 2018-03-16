'use strict'
import React, { Component } from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import NavigationHeader from './../NavigationHeader';

import Toast from './../Toast';
import Alert from './../Alert';
import Popup from './../Popup';


const MODAL_PREFIX = 'MODAL_PREFIX_';
const HEADER_REF = 'HEADER_REF';
const POPUP_REF = 'POPUP_REF';
const ALERT_REF = 'ALERT_REF';
const TOAST_REF = 'TOAST_REF';

var ID = 1;
function Screen(component) {
    class $Screen extends component {
        static childContextTypes = {
            screen:PropTypes.any,
            parent:PropTypes.any
        }
        static contextTypes = {
            screen:PropTypes.any,
            parent:PropTypes.any
        }
        constructor(...props) {
            super(...props);
            this._readyList = [];
            this._isReady = false;
            this.navigationOptions = this.navigationOptions||{header:null}
        }
        
        getScreen(){
            return this;
        }
        getParent(){
            return null;
        }
        getChildContext() {
            return {
                parent: this,
                screen: this
            }
        }
        getNavigation(){
            return this.props.navigation;
        }
        componentDidMount() {            
            this._isReady = true;
            this._fireReadyList();
            if (super.componentDidMount) {
                super.componentDidMount();
            }
        }
        _ready(callback) {
            if (this._isReady) {
                callback();
            } else {
                this._readyList.push(callback);
            }
        }
        _fireReadyList() {
            var callback = this._readyList.shift();
            while (callback) {
                callback();
                callback = this._readyList.shift();
            }
        }
        reload() {
            super.componentWillMount && super.componentWillMount();
            this.forceUpdate();
            setTimeout(() => super.componentDidMount && super.componentDidMount(), 100);
        }
        alert(config) {
            this._ready(() => this.refs[ALERT_REF].show(config));
        }
        toast(message, callback, timeout) {
            this._ready(() => this.refs[TOAST_REF].show(message, callback, timeout));
        }
        showPopup(config) {
            var id = MODAL_PREFIX + (++ID);
            config.id = id;
            this._ready(() => {
                this.refs[POPUP_REF].showContent(config);
            })
            return id;
        }
        hidePopup(id) {
            this._ready(() => {
                this.refs[POPUP_REF].hideContent(id);
            })
        }
        updateHeader(props){
            this.refs[HEADER_REF]&&this.refs[HEADER_REF].update(props); 
        }
        render() {
            var navigation = this.props.navigation;
            var headerProps = {
                ...this.navigationOptions||{header:null},
                ...navigation&&navigation.state.params || {}
            }
            return <View
                collapsable={true}
                style={[{ flex: 1, flexDirection: 'column' }]}>
                <NavigationHeader
                    ref = {HEADER_REF}
                    navigation = {navigation}
                    getHeaderProps = {()=>$Screen.headerProps}
                    {...headerProps}/>
                <View
                    collapsable={true}
                    style={{ flex: 1, flexDirection: 'column' }}
                    children = {super.render()}/>
                <Popup ref={POPUP_REF} />
                <Alert ref={ALERT_REF} />
                <Toast ref={TOAST_REF} />
            </View>
        }
    }
    $Screen.navigationOptions = {
        header:function(props){
            $Screen.headerProps = props;
            return null;
        }
    }
    return $Screen
}

export default Screen;


