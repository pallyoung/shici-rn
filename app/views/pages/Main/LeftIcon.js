'use strict'
import React from 'react';
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
import ScreenComponent from './../../components/ScreenComponent';


var currentTheme = Theme.getTheme();

class LeftIcon extends ScreenComponent {
    constructor(...props) {
        super(...props);
    }
    render() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={this.props.onMenuPress}
                style={styles.leftIcon}>
                <Icon
                    name="ios-menu-outline"
                    color='#333'
                    size={28} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    leftIcon: {
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
export default LeftIcon;