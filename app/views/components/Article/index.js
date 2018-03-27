'use strict'
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {Theme} from 'react-native-improver';

var currentTheme = Theme.getTheme();

function Title(props) {
    return (
        <View
            style={styles.titleWrapper}>
            <Text
                style={styles.title}>
                {props.title}
            </Text>
        </View>
    )
}
function Info(props) {
    return (
        <View
            style={styles.infoWrapper}>
            <Text
                style={styles.info}>
                {props.age}·{props.author}
            </Text>
        </View>
    );
}
function Content(props) {
    return (
        <View
            style={styles.contentWrapper}>
            {props.article.map(
                (item, i) => {
                    return <Text style={styles.content} key={i}>{item}</Text>;
                })
            }
        </View>
    );
}
function Article(props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            activeOpacity={1}
            style={styles.wrapper}>
            <Title title={props.title} />
            <Info
                age={props.age}
                author={props.author} />
            <Content 
                article={props.article}/>
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
    titleWrapper:{
        justifyContent:'center'
    },
    title:{
        fontSize:currentTheme.f5,
    },
    infoWrapper:{
        paddingVertical:8
    },
    info:{
        textAlign:'left'
    },
    contentWrapper:{

    },
    content:{
        marginBottom:8,
        lineHeight:2*currentTheme.f3
        
    }
})
export default Article;