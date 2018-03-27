'use strict'
import React from 'react';
import {
    View,
    SectionList,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet
}from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import {Theme} from 'react-native-improver';

var currentTheme = Theme.getTheme();

function TouchableRow(props){
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={props.onPress}
            style={styles.touchableRow}>
            <Text
                style={props.touchableRowText}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}

class My extends ScreenComponent{
    constructor(...props){
        super(...props);
    }
    render(){
        return (
            <View
                style={styles.wrapper}>
                <TouchableRow 
                    text='诗文'/>
                <TouchableRow 
                    text='名句'/>
                <TouchableRow 
                    text='古籍'/>
            </View> 
        );
    }
}


const styles = StyleSheet.create({
    wrapper:{
        flex:1
    },
    touchableRow:{
        flexDirection:'row',
        height:48,
        paddingLeft:currentTheme.paddingHorizontal,
        alignItems:'center',
        backgroundColor:'#fff',
        marginBottom:8
    },
    touchableRowText:{
        fontSize:currentTheme.f3
    }
});
export default My;