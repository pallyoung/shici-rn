'use strict'
import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';

import { Theme } from 'react-native-improver';
import ReactFebrest from 'react-febrest';

import ACTIONS from '../../../constants/ACTIONS';
import Content from './Content';
import Author from './Author';

const currentTheme = Theme.getTheme();

class Article extends ScreenComponent{
    constructor(...props){
        super(...props);
        this.navigationOptions = {
            title:''
        }
    }
    render(){
        let {params} = this.getScreen().getNavigation().state;
        return (
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                bounces={false}
                style={styles.wrapper}>
                <Content 
                    {...params}/>
                <Author
                    author={params.author}
                    age={params.age} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor:'#fff'
    }
})
export default Article;