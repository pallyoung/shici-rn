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

class Tuijie extends ScreenComponent{
    constructor(...props){
        super(...props);
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