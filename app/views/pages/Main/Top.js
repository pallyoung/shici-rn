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

class Top extends Component {
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
    _renderDate(date) {
        var lunar = Lunar.fromGMT(date);

        var term = lunar.getNextTerm();
        var dateString = lunar.toLocalString();
        var termString = '';
        if (term.offset == 0) {
            termString = term.term;
        } else if(term.offset == 1) {
            termString = '明日' + term.term;
        }
        return (
            <Text
                style={styles.date}>
                {dateString+'   '+termString}
            </Text>
        );
    }
    render() {
        var {
            height,
            width,
            image,
            text,
            date
        } = this.props;
        return (
            <View
                style={{
                    height,
                    width
                }}>
                <Image
                    source={{
                        uri: image,
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36'
                        }
                    }}
                    resizeMode='stretch'
                    style={{
                        height,
                        width
                    }} />
                <View
                    style={styles.textWrapper}>
                    {this._renderText(text)}
                    {this._renderDate(date)}
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    textWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 20,
        // alignItems: 'center',
        paddingLeft: 20,
        backgroundColor: 'rgba(30,30,30,0.1)'
    },
    text: {
        fontSize: 12,
        color: '#fff',
    },
    date:{
        marginTop:10,
        fontSize: 12,
        color: '#fff',
    }
});

export default Top;