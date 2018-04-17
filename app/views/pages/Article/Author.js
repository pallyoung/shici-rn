'use strict'
import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';

import { Theme } from 'react-native-improver';
import ACTIONS from '../../../constants/ACTIONS';


var currentTheme = Theme.getTheme();

function Author(props){
    let {author,age} = props;
    return (
        <View
            style={styles.wrapper}>
            <Text
                style={styles.text}>
                {age+'·'+author}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper:{
        marginHorizontal:12,
        marginTop:5,
    },
    text:{
        fontSize:14,
        fontWeight:'200',
        color:'#333',
        lineHeight:26,
    }
});


export default Author;