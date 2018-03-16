'use strict'

import React from 'react';
import {SceneComponent,ViewPager} from 'ares-react-native-basic-package';

import {View,Image,TouchableOpacity,StyleSheet,Text,Animated,Easing} from 'react-native';

import {Theme,autoSize} from 'react-native-improver';

const IndicatorViewPager = ViewPager.IndicatorViewPager;

class Slider extends SceneComponent{
    constructor(...props){
        super(...props);
        this.state = {
            show:false,
            children:null
        }
        this.animteValue = new Animated.Value(0);

    }
    show(children,callback){
        this.setState({show:true,children});
        Animated.timing(this.animteValue,{
            easing: Easing.ease,
            toValue: 1,
            duration: 200
        }).start(()=>{
            callback && callback();
        });
    }
    close(callback){
        Animated.timing(this.animteValue,{
            easing: Easing.ease,
            toValue: 0,
            duration: 210
        }).start(()=>{
            callback && callback();
            this.setState({show:false})
        });
    }
    render(){
        if (!this.state.show){
            return null;
        }
        var translateX = this.animteValue.interpolate({
            inputRange:[0,1],
            outputRange:[autoSize(375),0]
        })
        var transform = [
            {translateX}
         ];
         var left = {
             left:this.animteValue.interpolate({
                inputRange:[0,1],
                outputRange:[autoSize(375),0]
            })
         }
        var style = [this.props.style,left];
        return <Animated.View 
                style = {style}
                children = {this.state.children}
                />
    }
}

export default Slider;