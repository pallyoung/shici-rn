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


const currentTheme = Theme.getTheme();

class Search extends ScreenComponent{
    constructor(...props){
        super(...props);
        this.navigationOptions={
            title:'搜索'
        }
    }
    render(){
        return (
            <View>
                
            </View>
        );
    }
}

export default Search;