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

import ReactFebrest from 'react-febrest';
import ACTIONS from './../../../constants/ACTIONS';

import Page from './Page';

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

function getDateString(time){
    var date = new Date(parseInt(time));
    var y = date.getFullYear();
    var m = MONTH[date.getMonth()];
    var d = date.getDate();
    if(d<10){
        d = '0'+d;
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
            offset:0,
            index:0
        }

        this.dispatcher = ReactFebrest.createDispatcher(this,this._onDispatch);
    }
    componentDidMount() {
        let offset = this.state.offset;
        this.dispatcher.dispatch(ACTIONS.MAIN_PAGE,{
            every_day:[
                offset+1,offset,offset-1
            ]
        }) 
    }
    
    componentWillUnmount() {
        this.dispatcher.release();
    }
    _onPageSelected=(event)=>{
        let list = this.state.every_day_list;
        let position = event.nativeEvent.position;
        if(list[0]===null){
            position++;
        }
        let date = list[position].date,rightButton;
        if(new Date(date).toDateString()!==TODAY.toDateString()){
            rightButton = <RightIcon />
        }
        this.getScreen().updateHeader({
            title:getDateString(date),
            rightButton,

        })
    }
    _onDispatch(data){
        if(data.key===ACTIONS.MAIN_PAGE){
            /**
             * list 包含前一天，当天（当前应该显示的），后一天
            */
            let list = data.state.every_day_list;
            let current = list[1];
            /**
             * 不出bug的情况下应该都会有
            */
            if(current){
                this.getScreen().updateHeader({
                    title:getDateString(current.date)
                })
            }
            return false;
        }
    }
    _gotoToday=()=>{

    }
    _renderPage(){
        var list = this.state.every_day_list;
        if(!list){
            return null;
        }
        return list.map(function(item){
            if(item===null){
                return null;
            }
            return <Page 
                    date={item.date}
                    key={item.date}
                    image={item.pic}
                    text={item.mingju}
                    shi={item.shi}
                    />
        });
    }
    render() {
        return (
            <View
                style={styles.wrapper}>
                <ViewPager
                    ref='VIEWPAGER_REF'
                    onPageSelected={this._onPageSelected}
                    style={{flex:1}}>
                    {this._renderPage()}
                </ViewPager>
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