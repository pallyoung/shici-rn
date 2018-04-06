'use strict'
import React,{Component} from 'react';
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
import Empty from './Empty';

const currentTheme = Theme.getTheme();

class MingjuList extends Component{
    constructor(...props){
        super(...props);
        this.state = {

        }
    }
    _renderItem = ({ item }) => {
        return (
            <Paragrah
                {...item} />
        );
    }
    _keyExtractor = (item) => {
        return item.pageid;
    }
    render(){
        let {
            data
        } = this.props;
        return (
            <ListView 
                data={data}
                renderItem={this._renderItem}
                ListEmptyComponent={<Empty />}
                keyExtractor={this._keyExtractor}
                style={{flex:1}}/>
        );
    }
}
export default MingjuList;