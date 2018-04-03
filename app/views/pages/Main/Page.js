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
import Tail from './Tail';
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
        const {
            text,
            image,
            shi,
            date
        } = this.props;
        
        return (
            <ScrollView
                onLayout={this._onLayout}
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={[this.props.style]}>
                <Top 
                    height={height}
                    width={width}
                    image={image}
                    text={text}
                    date={date}
                    />
                <Tail 
                    {...shi}/>
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