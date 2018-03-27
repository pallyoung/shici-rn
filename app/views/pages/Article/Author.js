import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {Theme} from 'react-native-improver';

var currentTheme = Theme.getTheme();


function Author(props) {
    return (
        <View
            style={styles.wrapper}>
            <Text
                style={styles.text}>
                {props.age}·{props.author}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    wrapper:{
        paddingVertical:8
    },
    text:{
        fontSize:currentTheme.f3,
    }
});

export default Author;