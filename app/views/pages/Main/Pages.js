'use strict'
import React, { Component } from 'react';
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
import {
    ViewPager
} from 'react-native-awesome-viewpager';

import ReactFebrest from 'react-febrest';
import ACTIONS from './../../../constants/ACTIONS';
import Page from './Page';


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
    }
    componentWillUnmount() {
        this.dispatcher.release();
    }

    shouldComponentUpdate() {
        return false;
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
        var page;
        if (item0 == null) {
            item0 = item1;
            item1 = item2;
            item2 = {};
            page = 0;
        } else if (item2 == null) {
            item2 = item1;
            item1 = item0;
            item0 = {};
            page = 2;
        }else{
            page = 1;
        }
        Promise.all(
            this.refs['PAGE_1'].update(item0),
            this.refs['PAGE_2'].update(item1),
            this.refs['PAGE_3'].update(item2)
        ).then(() => {
            this._setPage(page);
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
            }else if(position==1){
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
        if (dataSource[0] == null && position == 1) {
            this.state.offset--;
            this._fetchData();
        } else if (dataSource[2] == null && position == 1) {
            this.state.offset++;
            this._fetchData();
        }
        if (position > 1) {
            this._goForward();
        } else if (position < 1) {
            this._goBack();
        }
    }
    render() {
        return (
            <ViewPager
                ref='VIEWPAGER_REF'
                onPageSelected={this._onPageSelected}
                style={this.props.style}>
                <View>
                    <Page
                        ref={'PAGE_1'} />
                </View>
                <View>
                    <Page
                        ref={'PAGE_2'} />
                </View>
                <View>
                    <Page                    
                        ref={'PAGE_3'} />
                </View>
            </ViewPager>
        );
    }
}

export default Pages;