import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {Theme} from 'react-native-improver';

var currentTheme = Theme.getTheme();


function Content(props) {
    return (
        <View
            style={styles.wrapper}>
            {props.article.map(
                (item, i) => {
                    return <Text style={styles.text} key={i}>{item}</Text>;
                })
            }
        </View>
    );
}


const styles = StyleSheet.create({
    wrapper:{
        paddingVertical:currentTheme.paddingHorizontal
    },
    text:{
        fontSize:currentTheme.f3,
        lineHeight:2*currentTheme.f3
    }
});

export default Content;