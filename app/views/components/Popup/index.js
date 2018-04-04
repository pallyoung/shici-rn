'use strict'
import React, { Component } from 'react';
import {View} from 'react-native';
import PopupModal from './PopupModal';
class Popup extends Component {
    constructor(...props) {
        super(...props);
        this._modals = new Map();
        this._elements = new Map();
        this._configs = new Map();
    }
    _createContent(config) {
        var id = config.id;
        var element = <PopupModal
            key={config.id}
            id={config.id}
            children={config.content}
            duration={config.duration}
            easing={config.easing}
            style={config.style || { backgroundColor: 'rgba(120,120,120,0.5)' }}
            onModalShow={this._onModalShow}
            onModalClose={this._onModalClose}
            onBackPress={this._onBackPress}
            onBackdropPress={this._onBackdropPress}
            animationType={config.animationType} />

        this._elements.set(id, element);
        this._configs.set(id,config);
    }
    _onBackPress = (id) => {
        var config = this._configs.get(id);
        if (config.onBackPress) {
            return config.onBackPress();
        } else {
            this._modals.get(id).hide();
            return true;
        }
    }
    _onBackdropPress = (id) => {
        var config = this._configs.get(id);
        if (config.onBackdropPress) {
            config.onBackdropPress();
        } else {
            this._modals.get(id).hide();
        }
    }
    _onModalShow =(id, modal)=>{
        var config = this._configs.get(id);
        if(config.onModalShow){
            config.onModalShow()
        }
        var element = this._elements.get(id);
        //外部提前调用了hideContent方法
        if(!element){
            modal.hide()
        }else{
            this._modals.set(id,modal);
        }
    }
    _onModalClose = (id, modal)=> {
        var config = this._configs.get(id);
        if(config.onModalClose){
            config.onModalClose()
        }
        this._configs.delete(id);
        this._modals.delete(id);
        this._elements.delete(id);
        this.forceUpdate();
    }
    showContent(config) {
        this._createContent(config);
        this.forceUpdate();
    }
    hideContent(id) {
        if (id === undefined) {
            this._elements.clear();
            this._modals.clear();
            this._configs.clear();
            this.forceUpdate();
            return;
        }
        var modal = this._modals.get(id);
        if (modal) {
            modal.hide();
        } else {
            this._elements.delete(id);
        }
    }
    _renderModal(){
        var elements = [];
        var values = this._elements.values();
        let v;
        do{
           v = values.next();
           if(v.value){
               elements.push(v.value);
           }
        }while(!v.done);
        return elements;
    }
    render() {
        if (this._elements.size == 0) {
            return null;
        }
        return (
            <View style={{
                position: 'absolute',
                flexDirection: 'column',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}>
                {this._renderModal()}
            </View>
        );
    }
}

export default Popup;