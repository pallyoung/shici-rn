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
}from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import {TabBar} from 'react-native-awesome-viewpager';
import {Theme} from 'react-native-improver';

import Header from './Header';


var currentTheme = Theme.getTheme();

class Main extends ScreenComponent{
    constructor(...props){
        super(...props);
        this.navigationOptions = {
            title:'诗辞',
            header:null
        }
    }
    render(){
       return  <View
                    style={{flex:1}}>
                <Header />
           </View>
    }
}
const styles = StyleSheet.create({
    
})
export default Main;