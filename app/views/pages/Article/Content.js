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
function Len(props){
    return (
        <Text 
            style={styles.text}>
            {props.text}
        </Text>
    )
}

function Content(props){
    return (
        <View
            style={styles.wrapper}>
            {
                props.content.map((text)=>{
                    return <Len 
                            key={text}
                            text={text}/>
                })
            }
        </View>
    );

}

const styles = StyleSheet.create({
    wrapper:{
        marginHorizontal:12,
        marginTop:12,
        paddingBottom:20,
        borderBottomWidth:currentTheme.px,
        borderBottomColor:currentTheme.borderColor     
    },
    text:{
        fontSize:14,
        fontWeight:'200',
        color:'#333',
        lineHeight:26,
    }
});


export default Content;