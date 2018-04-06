'use strict'
import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';

import { Theme } from 'react-native-improver';
import ReactFebrest from 'react-febrest';

import ListView from './../../components/ListView';
import ACTIONS from '../../../constants/ACTIONS';
import Paragrah from './../../components/Paragrah';

const currentTheme = Theme.getTheme();

class Mingju extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '名句录'
        }
        this.state = {

        }
        this.dispatcher =  ReactFebrest.createDispatcher(this, this._onDispatch)
    }
    componentDidMount() {
        this._fetchData();
    }
    componentWillUnmount() {
        this.dispatcher.release();
    }
    
    _fetchData=(isTop)=>{
        if(this._onFetching){
            return;
        }
        this._onFetching = true;
        this.dispatcher.dispatch(ACTIONS.GET_MINGJU_LIST,{isTop})
    }
    _onDispatch = (data) => {
        if(data.key===ACTIONS.GET_MINGJU_LIST){
            this._onFetching = false;
            return false;
        }
    }
    _renderItem = ({ item }) => {
        return (
            <Paragrah 
                text={item.text}/>
        );
    }
    _keyExtractor = (item) => {
        return item.pageid;
    }
    render() {
        let {mingjuList={}} = this.state;
        
        return (
            <View
                style={styles.wrapper}>
                <ListView
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    onTopReached={()=>this._fetchData(true)}
                    onBottomReached={this._fetchData}
                    showsVerticalScrollIndicator={false}
                    data={mingjuList.items} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor:'#fff'
    }
});

export default Mingju;