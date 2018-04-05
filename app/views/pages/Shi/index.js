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
import Article from './../../components/Article';

const currentTheme = Theme.getTheme();
class Shi extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '诗文集'
        }
        this.state = {};
        this.dispatcher = ReactFebrest.createDispatcher(this, this._onDispatch)
    }
    componentDidMount() {
        this._fetchData();
    }
    componentWillUnmount() {
        this.dispatcher.release();
    }
    _fetchData = () => {
        this.dispatcher.dispatch(ACTIONS.GET_SHI_LIST);
    }
    _onDispatch = (data) => {

    }
    _renderItem = ({ item }) => {
        return (
            <Article
                {...item} />
        );
    }
    _keyExtractor = (item) => {
        return item.pageid;
    }
    render() {
        let { shiList = {} } = this.state;

        return (
            <View
                style={styles.wrapper}>
                <ListView
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    onEndReached={this._fetchData}
                    showsVerticalScrollIndicator={false}
                    data={shiList.items} />
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

export default Shi;