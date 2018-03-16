'use strict'
import React from 'react';
import {
    View,
    ListView,
    SectionList,
    FlatList,
    TouchableOpacity,
    Text
}from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import {Theme} from 'react-native-improver';
var currentTheme = Theme.getTheme();
class Main extends ScreenComponent{
    constructor(...props){
        super(...props);
        this.navigationOptions = {
            title:'首页'
        }
    }
    render(){
       return  <View>
                <Text>
                    welcome use spencer kit start your project.
                </Text>
           </View>
    }
}
export default Main;