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
import { Theme } from 'react-native-improver';
import LeftIcon from './LeftIcon';
import RightIcon from './RightIcon';
import {
    Swiper,
    ViewPager
} from 'react-native-awesome-viewpager';



import Pages from './Pages';
import Menu from './Menu';

var currentTheme = Theme.getTheme();


class Main extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '',
            titleStyle: styles.titleStyle,
            leftButton: <LeftIcon onMenuPress={this._showMenu}/>,
            // rightButton: <RightIcon />
        }
        this.state = {
       
        }

    }
    componentWillUnmount() {
        this.dispatcher.release();
    }
    _showMenu = () => {
        this.getScreen().showPopup({
            content:<Menu />,
            animationType:'slideLeft'
        })
    }

    render() {
        return (
            <View
                style={styles.wrapper}>
                <Pages
                    ref='VIEWPAGER_REF'
                    style={{ flex: 1 }}
                    />
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