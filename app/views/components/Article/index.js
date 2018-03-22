'use strict'
import React from 'react';
import {
    View,
    Text,
    StyleSheet
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
                    if(!/^\s*$/.test(item)){
                        return <Text style={styles.content} key={i}>{item}</Text>;
                    }else{
                        return null;
                    }
                })
            }
        </View>
    );
}
function Article(props) {
    console.log(props)
    return (
        <View
            style={styles.wrapper}>
            <Title title={props.title} />
            <Info
                age={props.age}
                author={props.author} />
            <Content 
                article={props.article}/>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper:{
        marginLeft:currentTheme.paddingHorizontal,
        paddingRight:currentTheme.paddingHorizontal,
        paddingTop:10,
        paddingBottom:10,
        marginBottom:10,
        borderBottomWidth:currentTheme.px
    },
    titleWrapper:{
        justifyContent:'center'
    },
    title:{
        fontSize:currentTheme.f5,
        textAlign:'center'
    },
    infoWrapper:{
        paddingVertical:8
    },
    info:{
        textAlign:'center'
    },
    contentWrapper:{

    },
    content:{
        textAlign:'center',
        marginBottom:8
        
    }
})
export default Article;