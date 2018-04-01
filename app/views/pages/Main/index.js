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

import ScreenComponent from './../../components/ScreenComponent';
import { TabBar } from 'react-native-awesome-viewpager';
import { Theme } from 'react-native-improver';
import LeftIcon from './LeftIcon';
import RightIcon from './RightIcon';

var currentTheme = Theme.getTheme();

class Main extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '01 Feb,2018',
            titleStyle:styles.titleStyle,
            leftButton:<LeftIcon />,
            rightButton:<RightIcon />
        }
    }
    render() {
        return <View
            style={{ flex: 1 }}>
        </View>
    }
}
const styles = StyleSheet.create({
    titleStyle:{
        fontSize:12,
    },
    leftIcon:{
        marginLeft:20,
        flexDirection:'row',
        alignItems:'center'
    },
})
export default Main;