'use strict'

import React from 'react';

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import { Theme } from 'react-native-improver';

import Icon from './../../components/Icon';

const currentTheme = Theme.getTheme();

function DeleteButton(props){
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.wrapper}
            activeOpacity={1}>
            <Icon 
                size={30}
                name='ios-trash-outline'/>
            <Text
                style={styles.text}>删除</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    wrapper:{
        borderTopColor:currentTheme.borderColor,
        borderTopWidth:currentTheme.px,
        backgroundColor:'#fff',
        paddingVertical:8,
        alignItems:'center'
    },
    text:{
        color:'#333',
        fontSize:12,
        fontWeight:'200'
    }
});
export default DeleteButton;