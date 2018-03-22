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
import ReactFebrest from 'react-febrest';
import ACTIONS from './../../../constants/ACTIONS';
class Tuijie extends ScreenComponent{
    constructor(...props){
        super(...props);
        this.state = {

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
        return (
            <View>
                <Text>
                    {item.item}
                </Text>
            </View>
        )
    }
    _listKeyExtractor(item,index){
        return item+'';
    }
    render(){
        return (
            <ListView
                data={[1,2,3]}
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