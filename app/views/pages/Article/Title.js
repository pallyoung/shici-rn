import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {Theme} from 'react-native-improver';

var currentTheme = Theme.getTheme();

function Title(props){
    return (
        <View
            style={styles.wrapper}>
            <Text
                style={styles.text}>
                {props.text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper:{
        paddingVertical:currentTheme.paddingHorizontal
    },
    text:{
        fontSize:currentTheme.f5,
    }
});

export default Title;