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


var currentTheme = Theme.getTheme();

class Top extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        var {
            height,
            width,
            image,
            text
        } = this.props;
        return (
            <View
                style={{
                    height,
                    width
                }}>
                <Image
                    source={image}
                    resizeMode='stretch'
                    style={{
                        height,
                        width
                    }} />
                <View
                    style={styles.textWrapper}>
                    <Text>
                        {text}
                    </Text>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    textWrapper:{
        position:'absolute'
    }
});

export default Top;