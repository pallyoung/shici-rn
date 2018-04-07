'use strict'
import React,{Component} from 'react';
import {
    View,
    ListView,
    SectionList,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import { Theme } from 'react-native-improver';
import Icon from 'react-native-vector-icons/Ionicons';


var currentTheme = Theme.getTheme();

class RightButton extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={this.props.onPress}
                style={styles.wrapper}>
                <Text
                    style={styles.text}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        borderRadius:4,
        borderWidth:currentTheme.px,
        borderColor:currentTheme.color,
        paddingVertical:4,
        paddingHorizontal:5,
        marginRight:20
    },
    text:{
        color:currentTheme.color,
        fontSize:14
    }
});
export default RightButton;