'use strict'
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { Theme } from 'react-native-improver';
import Febrest from 'febrest';
import ACTIONS from '../../../constants/ACTIONS';
import Icon from './../Icon';
var currentTheme = Theme.getTheme();

function Search(props){
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.wrapper}>
            <Icon 
                size={13}
                name='ios-search-outline'/>
            <Text
                style={styles.text}>  搜索</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper:{
        height:30,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:8,
        marginVertical:8,
        borderRadius:2,
        backgroundColor:'rgba(73,90,128,0.2)'
    },
    text:{
        color:'#333',
        fontWeight:'200',
        fontSize:12
    }
});

export default Search;