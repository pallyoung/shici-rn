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
import {
    Swiper,
    ViewPager
} from 'react-native-awesome-viewpager';
import Page from './Page';

var currentTheme = Theme.getTheme();

class Main extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '01 Feb,2018',
            titleStyle: styles.titleStyle,
            leftButton: <LeftIcon />,
            rightButton: <RightIcon />
        }
    }
    render() {
        return (
            <View
                style={styles.wrapper}>
                <Swiper
                    indicator={false}
                    style={styles.wrapper}>
                    <Page />
                    <Page />
                </Swiper>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column'
    },
    titleStyle: {
        fontSize: 12,
    },
    leftIcon: {
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
})
export default Main;