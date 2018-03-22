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
        this.dispatcher.dispatch(ACTIONS.FETCH_DEFAULT);
    }
    componentWillUnmount() {
        this.dispatcher.release();
    }
    
    _onDispatch=(data:{state:any})=>{
    }
    _renderItem(item){
        console.log(item)
        return (
            <Article  {...item.item}/>
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
                renderItem={this._renderItem}
                keyExtractor={this._listKeyExtractor}
                style={styles.wrapper}/>
        );
    }

}

const styles = StyleSheet.create({
    wrapper:{
        flex:1
    }
});
export default Tuijie;