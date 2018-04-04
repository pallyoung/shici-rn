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
    Animated
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import { Theme } from 'react-native-improver';
import {
    ViewPager,
} from 'react-native-awesome-viewpager';

import ReactFebrest from 'react-febrest';
import ACTIONS from './../../../constants/ACTIONS';
import RightIcon from './RightIcon';
import Page from './Page';

import C from './C';

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

class Pages extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.state = {
            offset: 0
        }
        this._position = 0;
        this._dataSource = [];

        this.dispatcher = ReactFebrest.createDispatcher(this, this._onDispatch);

    }
    componentDidMount() {
        this._fetchData();
        setInterval(()=>this.forceUpdate(),4000)
    }
    componentWillUnmount() {
        this.dispatcher.release();s
    }

    shouldComponentUpdate() {
        return true;
    }
    _onDispatch=(data)=>{
        if (data.key === ACTIONS.MAIN_PAGE) {
            this._dataSource = data.state.every_day_list;
            this._update();
            return true;
        }
    }
    _update() {
        var dataSource = this._dataSource;
        var [item0, item1, item2] = dataSource;
        var page,page0,page1,page2,date;
        if (item0 == null) {
            item0 = item1;
            item1 = item2;
            item2 = {};
            date = item0.date;
            page0 = <Page key={item0.date} {...item0}/>
            page = 0;
        } else if (item2 == null) {
            item2 = item1;
            item1 = item0;
            date = item2.date;
            page2 = <Page key={item2.date} {...item2}/>
            item0 = {};
            page = 2;
        }else{
            date = item1.date;
            page1 = <Page key={item1.date} {...item1}/>
            page = 1;
        }
        Promise.all(
            this.refs['C_0'].setChild(page0),
            this.refs['C_1'].setChild(page1),
            this.refs['C_2'].setChild(page2)
        ).then(() => {
            this._setPage(page);
            this._updateHeader(date)
        })

    }
    _fetchData() {
        let offset = this.state.offset;
        this.dispatcher.dispatch(ACTIONS.MAIN_PAGE, {
            every_day: [
                offset + 1, offset, offset - 1
            ]
        });
    }
    _updateHeader(date){
        var rightButton;
        if(new Date(date).toDateString()!==TODAY.toDateString()){
            rightButton = <RightIcon onPress={this._gotoToday}/>
        }
        this.getScreen().updateHeader({
            title:getDateString(date),
            rightButton
        })
    }
    _gotoToday=()=>{
        if(this.state.offset==0){
            return;
        }
        this.state.offset = 0;
        this._fetchData();
    }
    _setPage(page) {
        if (page===undefined) {
            return;
        }
        this._position = page;
        this.refs['VIEWPAGER_REF'].setPageWithoutAnimation(page);
    }
    _onPageSelected = (event) => {
        let { position } = event.nativeEvent;
        let dataSource = this._dataSource;
        let cPosition = this._position;
        let [item0, item1, item2] = dataSource;
        if (cPosition == position) {
            return;
        }
        if (cPosition == 0 && position == 1 && item0==null ) {
            /**
             * 说明只有两条数据，到第二页的时候要去拿数据
             */
            this.state.offset--;
            this._fetchData();
            return;

        }
        if(cPosition == 1){
            if(position==2){
                this.state.offset--;
                this._fetchData();
            }else if(position==0){
                this.state.offset++;
                this._fetchData();
            }
            return;
        }
        if(cPosition == 2 && position == 1 && item2 == null){
            this.state.offset++;
            this._fetchData();
            return;
        }
        return;
    }
    render() {
        return (
            <ViewPager
                ref='VIEWPAGER_REF'
                initialPage={1}
                onPageSelected={this._onPageSelected}
                style={this.props.style}>
                <View>
                    <C 
                        ref='C_0'/>
                </View>
                <View>
                    <C 
                        ref='C_1'/>
                </View>
                <View>
                    <C 
                        ref='C_2'/>
                </View>
            </ViewPager>
        );
    }
}

export default Pages;