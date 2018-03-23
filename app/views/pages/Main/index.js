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
import Tuijie from './Tuijie';
import Mingju from './Mingju';
import Guji from './Guji';

var currentTheme = Theme.getTheme();

const tabs = [
    {
        text:'推荐'
    },
    {
        text:'名句'
    },
    {
        text:'古籍'
    }
];
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
                <TabBar
                    style={{flex:1}}
                    tabs={tabs}>
                    <View>
                        <Tuijie />
                    </View>
                    <View>
                        <Mingju />
                    </View>
                    <View>
                        <Guji />
                    </View>
                </TabBar>
           </View>
    }
}
const styles = StyleSheet.create({
    
})
export default Main;