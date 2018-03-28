'use strict'
import React from 'react';
import {
    View,
    SectionList,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet
}from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import ListView from './../../components/ListView';
import Article from './../../components/Article';
import ReactFebrest from 'react-febrest';
import ACTIONS from './../../../constants/ACTIONS';

class Tuijie extends ScreenComponent{
    constructor(...props){
        super(...props);
        this.state = {
            tuijie:{}
        }
    }
    componentDidMount() {
        this.dispatcher = ReactFebrest.createDispatcher(this,this._onDispatch);
        this.dispatcher.dispatch(ACTIONS.FETCH_DEFAULT,{loadMore:true});
    }
    componentWillUnmount() {
        this.dispatcher.release();
    }
    
    _navigateToArticle(id){
        this.getScreen().getNavigation().navigate('Article',{id});
    }
    _fav(id,isFav){
        if(!isFav){
            this.dispatcher.dispatch(ACTIONS.ADD_FAV,{id});
        }else{
            this.dispatcher.dispatch(ACTIONS.REMOVE_FAV,{id});
        }
    }
    _onDispatch=(data:{state:any},isThis)=>{
        if(isThis&&(data.key===ACTIONS.ADD_FAV||data.key===ACTIONS.REMOVE_FAV)){
            this.dispatcher.dispatch(ACTIONS.FETCH_DEFAULT);
            return true;
        }
    }
    _renderItem=(item)=>{
        return (
            <Article
                onFav={()=>this._fav(item.item.id,item.item.isFav)}
                onPress={()=>this._navigateToArticle(item.item.id)} 
                {...item.item}/>
        )
    }
    _listKeyExtractor(item,index){
        return item.id+'';
    }
   
    render(){
        var {data} = this.state.tuijie
        return (
            <ListView
                data={data}
                onEndReached={()=>this.dispatcher.dispatch(ACTIONS.FETCH_DEFAULT,{loadMore:true})}
                renderItem={this._renderItem}
                keyExtractor={this._listKeyExtractor}
                style={styles.wrapper}/>
        );
    }

}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:'#fff'
    }
});
export default Tuijie;