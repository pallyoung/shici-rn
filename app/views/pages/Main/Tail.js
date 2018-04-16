'use strict'
import React, { Component } from 'react';
import {
    View,
    ListView,
    SectionList,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import { Theme } from 'react-native-improver';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenComponent from './../../components/ScreenComponent';
import Lunar from './../../../util/Lunar';


var currentTheme = Theme.getTheme();

class Tail extends Component {
    constructor(...props) {
        super(...props);
    }
    _renderText(text) {
        return (
            <Text
                key={text}
                style={[styles.text]}>
                {text}
            </Text>
        );
    }
    render() {
        var {
            title,
            content,
            author,
            age
        } = this.props;
        return (
            <View
                style={styles.wrapper}>
                <View
                    style={styles.titleSection}>
                    <Text
                        style={styles.title}>
                        {title}
                    </Text>
                </View>
                <View
                    style={styles.authorSection}>
                    <Text
                        style={styles.author}>
                        {age} {author}
                    </Text>
                </View>
                <View
                    style={styles.contentSection}>
                    {content.map((item) => {
                        return (
                            <Text
                                style={styles.content}
                                key={item}>
                                {item}
                            </Text>
                        );
                    })}

                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        borderTopWidth:currentTheme.px,
        borderTopColor:currentTheme.borderColor,
        marginHorizontal: 12,
        paddingTop: 20,
        paddingBottom: 30
    },
    titleSection: {
        paddingBottom: 10
    },
    title: {
        fontSize: 20,
        fontWeight:'200',
        color: '#333'
    },
    authorSection: {
        paddingBottom: 10,
    },
    author: {
        fontSize: 12,
        color: '#333',
        fontWeight:'200',
    },
    contentSection: {
        paddingBottom: 10,
    },
    content: {
        fontSize: 14,
        color: '#333',
        paddingVertical: 5,
        fontWeight:'200',
    },
    text: {
        fontSize: 12,
        color: '#fff',
        fontWeight:'200',
    }
});

export default Tail;