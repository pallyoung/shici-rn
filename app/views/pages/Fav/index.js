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
import Febrest from 'febrest';
import {ViewPager} from 'react-native-awesome-viewpager';

import ListView from './../../components/ListView';
import ACTIONS from '../../../constants/ACTIONS';
import MingjuList from './MingjuList';
import ShiList from './ShiList';
import Mingju from '../Mingju';

const currentTheme = Theme.getTheme();
class Fav extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '我的收藏'
        }
        this.state = {};
        this.dispatcher = ReactFebrest.createDispatcher(this, this._onDispatch);

    }
    componentDidMount() {
        this._fetchData();
    }
    componentWillUnmount() {
        this.dispatcher.release();
    }
    _fetchData = () => {
        this.dispatcher.dispatch(ACTIONS.GET_FAV);
    }
    _onDispatch = (data) => {
        switch (data.key){
            case ACTIONS.REMOVE_FAV:
                this._fetchData();
                return true;
            case ACTIONS.ADD_FAV:
                this._fetchData();
                return true;
        }
    }
    render() {
        let { fav = {} } = this.state;
        let {
            shi,
            mingju 
        } = fav;
        return (
            <View
                style={styles.wrapper}>
                <ViewPager
                    style={styles.wrapper}>
                    <View>
                        <ShiList 
                            data={shi}/>
                    </View>
                    <View>
                        <MingjuList
                            data={mingju}/>
                    </View>
                </ViewPager>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:'#fff'
    }
});

export default Fav;