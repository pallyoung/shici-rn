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
import ArticleItem from './../../components/ArticleItem';
import Search from './../../components/Search';
import Menu from './Menu';

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
        if(this._onFetching){
            return;
        }
        this._onFetching = true;
        this.dispatcher.dispatch(ACTIONS.GET_SHI_LIST);
    }
    _onDispatch = (data) => {
        let screen = this.getScreen();
        let navigation = screen.getNavigation();
        let {key,state} = data;
        switch(data.key){
            case ACTIONS.REMOVE_FAV:
                this._fetchData();
                return true;
            case ACTIONS.ADD_FAV:
                this._fetchData();
                return true;
            case ACTIONS.GET_SHI_LIST:
                this._onFetching = false;
                return false;
            case ACTIONS.NAVIGATE_TO_SHI:
                navigation.navigate('Article',data.state);
                return;
            case ACTIONS.APP_SEARCH:
                navigation.navigate('Search',data.state);
                return;
            case ACTIONS.SHI_ITEM_MENU:
                let popid = screen.showPopup({
                    animationType:'fade',
                    content:<Menu 
                                {...data.state}
                                onClose={()=>screen.hidePopup(popid)}/> 
                })
                return;

        }  
    }
    _renderItem = ({ item }) => {
        return (
            <ArticleItem
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
                <Search />
                <ListView
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    onTopReached={()=>this._fetchData(true)}
                    onBottomReached={this._fetchData}
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