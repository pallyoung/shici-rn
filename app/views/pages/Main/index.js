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

var currentTheme = Theme.getTheme();


class Main extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '',
            titleStyle: styles.titleStyle,
            leftButton: <LeftIcon />,
            // rightButton: <RightIcon />
        }
        this.state = {
       
        }

    }


    componentWillUnmount() {
        this.dispatcher.release();
    }
    _onPageSelected = (position) => {
        // let date = list[position].date, rightButton;
        // if (new Date(date).toDateString() !== TODAY.toDateString()) {
        //     rightButton = <RightIcon />
        // }
        // this.getScreen().updateHeader({
        //     title: getDateString(date),
        //     rightButton,
        // });
        if (position = 1) {
            this.state.offset--;
        } else if(position == -1){
            this.state.offset++
        }else{
            return;
        }
        this._fetchData();
    }
    _onDispatch(data) {
   
    }
    _gotoToday = () => {

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