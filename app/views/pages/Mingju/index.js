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
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';

import {Theme} from 'react-native-improver';

const currentTheme = Theme.getTheme();
class Mingju extends ScreenComponent{
    constructor(...props){
        super(...props);
        this.navigationOptions = {
            title:'名句录'
        }
    }
    render(){
        return (
            <View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default Mingju;