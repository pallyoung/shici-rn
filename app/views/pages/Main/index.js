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

import ReactFebrest from 'react-febrest';
import ACTIONS from './../../../constants/ACTIONS';

import Pages from './Pages';

var currentTheme = Theme.getTheme();

const MONTH = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
]

function getDateString(time) {
    var date = new Date(parseInt(time));
    var y = date.getFullYear();
    var m = MONTH[date.getMonth()];
    var d = date.getDate();
    if (d < 10) {
        d = '0' + d;
    }
    return `${d} ${m},${y}`;
}

const TODAY = new Date();

class Main extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '01 Feb,2018',
            titleStyle: styles.titleStyle,
            leftButton: <LeftIcon />,
            // rightButton: <RightIcon />
        }
        this.state = {
            offset: -1,
            index: 0
        }

        this.dispatcher = ReactFebrest.createDispatcher(this, this._onDispatch);
    }
    componentDidMount() {
        this._fetchData();
        // setInterval(()=>{
        //     this.state.offset--;
        //     this._fetchData();
        // },6000)
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
        if (data.key === ACTIONS.MAIN_PAGE) {
            console.log(data.state.every_day_list[1].mingju)
            return false;
        }
    }
    _gotoToday = () => {

    }
    _fetchData() {
        let offset = this.state.offset;
        this.dispatcher.dispatch(ACTIONS.MAIN_PAGE, {
            every_day: [
                offset + 1, offset, offset - 1
            ]
        });
    }


    render() {
        var list = this.state.every_day_list;
        return (
            <View
                style={styles.wrapper}>
                <Pages
                    ref='VIEWPAGER_REF'
                    dataSource={list}
                    onPageSelected={this._onPageSelected}
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