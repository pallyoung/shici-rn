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
               >
                <Text>{title}</Text>
                <Text>{age} {author}</Text>
                {content.map((item)=>{
                    return <Text key={item}>{item}</Text>
                })}
                
            </View>
        )
    }

}

const styles = StyleSheet.create({
    wrapper: {

    },
    text: {
        fontSize: 12,
        color: '#fff',
    }
});

export default Tail;