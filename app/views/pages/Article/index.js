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
            this.getScreen().updateHeader({title:article.title});
            this.setState({article});
            return true;
        }
    }
    render(){
        var article = this.state.article;
        if(!article){
            return null;
        }
        console.log(article)
        return (
            <ScrollView>
                <View>
                    <Text>
                        {article.title}
                    </Text>
                </View>
                <View>
                    <Text>
                        {article.age}:{article.author}
                    </Text>
                </View>
                <View>
                    {article.article.map((item)=>{
                        return (
                            <Text
                                key={item}>
                                {item}
                            </Text>
                        );
                    })}
                </View>
                <View>
                    <Text>
                        注释
                    </Text>
                    {
                        article.zhushi.map((item)=>{
                            return (
                                <Text
                                    key={item}>
                                    {item}
                                </Text>
                            ); 
                        })
                    }
                </View>
                <View>
                    <Text>
                        解析
                    </Text>
                </View>
                <View>
                    <Text>
                        作者
                    </Text>
                </View>
            </ScrollView>
        )
    }
}

export default Article;