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
import Paragrah from './../../components/Paragrah';
import ReactFebrest from 'react-febrest';
import ACTIONS from './../../../constants/ACTIONS';

class Guji extends ScreenComponent{
    constructor(...props){
        super(...props);
        this.state = {
            mingju:{}
        }
    }
    componentDidMount() {
        this.dispatcher = ReactFebrest.createDispatcher(this,this._onDispatch);
        this.dispatcher.dispatch(ACTIONS.FETCH_GUJI);
    }
    componentWillUnmount() {
        this.dispatcher.release();
    }
    
    _onDispatch=(data:{state:any})=>{
    }
    _renderItem(item){
        console.log(item)
        return (
            <Paragrah  
                text = {item.item.text}/>
        )
    }
    _listKeyExtractor(item,index){
        return index+'';
    }
    render(){
        var {data} = this.state.mingju
        return (
            <ListView
                data={data}
                onEndReached={()=>this.dispatcher.dispatch(ACTIONS.FETCH_GUJI)}
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
export default Guji;