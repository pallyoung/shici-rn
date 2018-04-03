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

import Page from './Page';

class Pages extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            page: 0,
            update: true,
        }
        this._position = 0;
    }
    
    shouldComponentUpdate(nextProps){
        var dataSource = nextProps.dataSource||[];
        for(let i = 1;i<=3;i++){
            console.log(!!this.refs['PAGE_'+i])
            this.refs['PAGE_'+i]&&this.refs['PAGE_'+i].update(dataSource[i-1]);
        }
        let update = this.state.update;
        this.state.update = false;
        return false;
    }
    componentDidUpdate(prevProps, prevState) {
    }
    
    _setPage(page,o) {
        var dataSource = this.dataSource||[];
        this.state.page = page;
        this.refs['PAGE_1'].update(dataSource[o]);
        this.refs['VIEWPAGER_REF'].setPageWithoutAnimation(page);
    }
    _renderPage(list) {
        return list.map(function (item, i) {
            if (item === null) {
                return null;
            }
            return (
                <Page
                    date={item.date}
                    key={item.date}
                    image={item.pic}
                    text={item.mingju}
                    shi={item.shi}
                />
            );
        });
    }
    _onPageSelected = (event) => {
        let { position } = event.nativeEvent;
        if(position>1){
            this._goForward();
            console.log('_goForward',position,this._position)
        }else if(position<1){
            console.log('_goBack',position,this._position)
            this._goBack();
        }
    }
    _goForward(){
        this.props.onPageSelected(1);
        this._setPage(1,2);
    }
    _goBack(){
        this.props.onPageSelected(-1);
        this._setPage(1,0);
    }
    render() {
        var dataSource = this.props.dataSource;
        return (
            <ViewPager
                ref='VIEWPAGER_REF'
                onPageSelected={this._onPageSelected}
                // initialPage={initialPage}
                style={this.props.style}>
                <View>
                    <Page
                        ref={'PAGE_1'}/>
                </View>
                <View>
                    <Page
                        ref={'PAGE_2'}/>
                </View>
                <View>
                    <Page
                        ref={'PAGE_3'}/>
                </View>
            </ViewPager>
        );
    }
}

export default Pages;