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
import ACTIONS from '../../../constants/ACTIONS';;
import RightButton from './../../components/RightButton';

const currentTheme = Theme.getTheme();
class Collection extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '我的诗集',
            rightButton:<RightButton 
                            text='新建'
                            onPress={this._add}/>
        }
        this.state = {};
        this.dispatcher = ReactFebrest.createDispatcher(this, this._onDispatch)
    }
    componentDidMount() {
    }
    componentWillUnmount() {
        this.dispatcher.release();
    }
    _add=()=>{
        let navigation = this.getScreen().getNavigation();
        navigation.navigate('CreateCollection')
    }
    _fetchData = () => {
        this.dispatcher.dispatch(ACTIONS.GET_COLLECTION);
    }
    _onDispatch = (data) => {

        let navigation = this.getScreen().getNavigation();
        // switch (data.key){
        //     case ACTIONS.UPDATE_COLLECTION:
        //         navigation.navigate('CollectionUpdate')
        //         return true;
        // }
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

export default Collection;