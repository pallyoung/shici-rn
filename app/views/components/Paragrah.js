'use strict'
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import {Theme} from 'react-native-improver';

var currentTheme = Theme.getTheme();

function Paragrah(props){
    return (
        <TouchableOpacity
            style={styles.wrapper}
            activeOpacity={1}>
            <Text
                style={styles.text}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper:{
        marginLeft:currentTheme.paddingHorizontal,
        paddingRight:currentTheme.paddingHorizontal,
        paddingTop:10,
        paddingBottom:10,
        borderBottomWidth:currentTheme.px,
        borderColor:'rgba(120,120,120,0.5)'
    },
    text:{
        fontSize:currentTheme.f2,
        lineHeight:1.5*currentTheme.f2
    }
});
export default Paragrah;