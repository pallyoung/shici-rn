'use strict'
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { Theme } from 'react-native-improver';
import Febrest from 'febrest';
import ACTIONS from '../../../constants/ACTIONS';
var currentTheme = Theme.getTheme();

function Title(props){
    return (
        <View>
            <Text
                style={styles.title}>
                {props.title}   ({props.author}/{props.age})
            </Text>
        </View>
    );
}

function Main(props){
    let sen = props.article[0];
    if(sen.length>25){
        let sens = sen.split('。');
        let i = 0;
        sen = '';
        while((sen.length)<20){
            sen = sen+sens[i]+'。';
            i++;
        }
    }
    return (
        <View
            style={styles.contentWrapper}>
            <Text
                style={styles.content}>
                {sen}
            </Text>
        </View>
    );
}

function ArticleItem(props){
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.wrapper}>
            <Title 
                age={props.age}
                author={props.author}
                title={props.title}/>
            <Main 
                article={props.content}/>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    wrapper: {
        marginLeft: currentTheme.paddingHorizontal,
        paddingRight: currentTheme.paddingHorizontal,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: currentTheme.px,
        backgroundColor: '#fff',
        borderColor: 'rgba(120,120,120,0.5)'
    },
    titleWrapper: {
        justifyContent: 'center'
    },
    title: {
        fontSize: currentTheme.f3,
        color: '#333',
        fontWeight:'200'
    },
    infoWrapper: {
        paddingVertical: 8
    },
    info: {
        textAlign: 'left',
        fontSize: currentTheme.f2,
        color: '#333',
        fontWeight:'200'
    },
    contentWrapper: {
        marginTop:20
    },
    content: {
        fontSize: currentTheme.f2,
        color: '#333',
        fontWeight:'200'

    },
    favWrapper: {
        marginBottom: 8,
        alignItems: 'flex-end'
    },
    fav: {
        fontSize: currentTheme.f2,
        color: '#795548'
    }
})

export default ArticleItem;