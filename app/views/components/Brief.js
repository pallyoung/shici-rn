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

function Brief(props){
    return (
        <TouchableOpacity
            style={styles.wrapper}
            activeOpacity={1}>
            <View>
                <Text
                    style={styles.text}>
                    {props.title}
                </Text>
            </View>
            <View>
                <Text
                    style={styles.text}>
                    {props.brief}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper:{
        marginLeft:currentTheme.paddingHorizontal,
        paddingRight:currentTheme.paddingHorizontal,
        paddingTop:10,
        paddingBottom:10,
        marginBottom:10,
        borderBottomWidth:currentTheme.px,
        borderColor:'rgba(120,120,120,0.5)'
    },
    text:{
        fontSize:currentTheme.f3,
        lineHeight:2*currentTheme.f3
    }
});
export default Brief;