'use strict'
import React,{Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import { Theme } from 'react-native-improver';

const currentTheme = Theme.getTheme();

class Empty extends Component{
    constructor(...props){
        super(...props);
        this.state = {

        }
    }
    render(){
        return (
            <View>
                <Text>
                    您还没有收藏过。
                </Text>
            </View>
        );
    }
}
export default Empty;