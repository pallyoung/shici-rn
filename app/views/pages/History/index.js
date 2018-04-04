'use strict'
import React from 'react';
import {
    View,
    ListView,
    ScrollView,
    SectionList,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';


class History extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title:'往日久诗'
        }
        this.state = {

        }
    }
    render() {
        return (
            <View>

            </View>
        );
    }
}

export default History;