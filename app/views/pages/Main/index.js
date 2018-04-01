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

var currentTheme = Theme.getTheme();

class Main extends ScreenComponent{
    constructor(...props){
        super(...props);
        this.navigationOptions = {
            title:'诗辞'
        }
    }
    render(){
       return  <View
                    style={{flex:1}}>
                
           </View>
    }
}
const styles = StyleSheet.create({
    
})
export default Main;