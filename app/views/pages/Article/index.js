'use strict'
import React from 'react';
import {
    View,
    ListView,
    ScrollView,
    SectionList,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet
}from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import {TabBar} from 'react-native-awesome-viewpager';
import {Theme} from 'react-native-improver';
import ReactFebrest from 'react-febrest';
import ACTIONS from './../../../constants/ACTIONS';

import Title from './Title';

import Content from './Content';
import Author from './Author';

var currentTheme = Theme.getTheme();

class Article extends ScreenComponent{
    constructor(...props){
        super(...props);
        this.navigationOptions = {

        }
        this.state = {

        }
        this.dispatcher = ReactFebrest.createDispatcher(this,this._onDispatch);
    }
    componentDidMount(){
        var id = this.getScreen().getNavigation().state.params.id;
        this.dispatcher.dispatch(ACTIONS.FETCH_ARTICLE,{id});
    }
    _onDispatch(data,isThis){
        if(data.key===ACTIONS.FETCH_ARTICLE&&isThis){
            let article = data.state.article;
            let title = article.title;
            if(title.length>12){
                title = title.slice(0,11)+'...';
            }
            this.getScreen().updateHeader({title});
            this.setState({article});
            return true;
        }
    }
    render(){
        var article = this.state.article;
        if(!article){
            return null;
        }
        return (
            <ScrollView
                bounces={false}
                style={styles.wrapper}
                showsVerticalScrollIndicator={false} >
                <Title 
                    text={article.title}/>
                <Author
                    age={article.age}
                    author={article.author}
                     />
                <Content 
                    article={article.article}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper:{
       backgroundColor:'#fff',
       flex:1,
       paddingHorizontal:currentTheme.paddingHorizontal,
    },
});

export default Article