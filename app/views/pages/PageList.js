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
import ScreenComponent from './../components/ScreenComponent';
// import {TabNavigator,DrawerNavigator} from 'react-navigation';

import {Theme} from 'react-native-improver';
var currentTheme = Theme.getTheme();
class PageList extends ScreenComponent{
    constructor(...props){
        super(...props);
        this.navigationOptions = {
            title:'PageList'
        }
    }
    renderItem(item){
        if(item.item ==='PageList'){
            return null
        }
        return <TouchableOpacity
                    style = {{
                        height:60,
                        paddingLeft:20,
                        backgroundColor:'#fff',
                        borderBottomWidth:currentTheme.borderWidth,
                        borderBottomColor:'#fefefe',
                        justifyContent:'center'
                    }}
                    key = {item.item}
                    onPress = {()=>{
                        this.getScreen().getNavigation().navigate(item.item);
                    }}><Text>{item.item}</Text></TouchableOpacity>
    }
    render(){
        var data = APPContext.Routes;
       return  <FlatList
                    style = {{flex:1,marginTop:2}}
                    keyExtractor = {(item)=>item}
                    data = {Object.keys(data)}
                    renderItem = {(item)=>this.renderItem(item)}
                    />
    }
}
export default PageList;