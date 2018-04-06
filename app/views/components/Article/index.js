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


function favIt(item) {
    if (item.isFav) {
        Febrest.dispatch(ACTIONS.REMOVE_FAV, {
            fav_id: item.fav_id
        });
    } else {
        Febrest.dispatch(ACTIONS.ADD_FAV, {
            user_id: 1,
            content_id: item.pageid,
            content_type: item.content ? 'shi' : 'mingju'
        });
    }

}
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
                article={props.content} />
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => favIt(props)}
                style={styles.favWrapper}>
                <Text
                    style={styles.fav}>
                    {props.isFav ? '取消收藏' : '点我收藏'}
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginLeft: currentTheme.paddingHorizontal,
        paddingRight: currentTheme.paddingHorizontal,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: currentTheme.px,
        backgroundColor: '#fff',
        borderColor: 'rgba(120,120,120,0.5)'
    },
    titleWrapper: {
        justifyContent: 'center'
    },
    title: {
        fontSize: currentTheme.f4,
        color: '#333'
    },
    infoWrapper: {
        paddingVertical: 8
    },
    info: {
        textAlign: 'left',
        fontSize: currentTheme.f2,
        color: '#333'
    },
    contentWrapper: {

    },
    content: {
        marginBottom: 8,
        fontSize: currentTheme.f2,
        lineHeight: 1.5 * currentTheme.f2,
        color: '#333'

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
export default Article;