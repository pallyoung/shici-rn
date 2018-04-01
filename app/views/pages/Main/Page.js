'use strict'
import React from 'react';
import {
    View,
    ListView,
    SectionList,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';

import { Theme } from 'react-native-improver';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenComponent from './../../components/ScreenComponent';

import Top from './Top';
var currentTheme = Theme.getTheme();

class Page extends ScreenComponent{
    constructor(...props) {
        super(...props);
        this.state = {};
    }
    _onLayout=(e)=>{
        const {layout:{height,width}} = e.nativeEvent;
        if(this.state.height!==height||this.state.width!==width){
            this.setState({height,width});
        }
    }
    render(){
        const {
            height,
            width
        } = this.state;
        return (
            <ScrollView
                onLayout={this._onLayout}
                bounces={false}
                showVerticalIndicator={false}
                style={[this.props.style]}>
                <Top 
                    height={height}
                    width={width}
                    text={2222}
                    />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor:'#eeddff'
    }
});
export default Page;