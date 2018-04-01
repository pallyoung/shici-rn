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
import Icon from 'react-native-vector-icons/FontAwesome';

import ScreenComponent from './../../components/ScreenComponent';

class Header extends ScreenComponent{
    constructor(...props) {
        super(...props);
    }
    render(){
        return (
            <View>
               <Icon name="rocket" size={30} color="#900" /> 
            </View>
        );
    }
}

export default Header;