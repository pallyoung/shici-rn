'use strict'
import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';

import { Theme } from 'react-native-improver';
import ReactFebrest from 'react-febrest';

import ListView from './../../components/ListView';
import ACTIONS from '../../../constants/ACTIONS';;
import RightButton from './../../components/RightButton';

const currentTheme = Theme.getTheme();
class Collection extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '我的诗集',
            rightButton: <RightButton
                text='新建'
                onPress={this._add} />
        }
        this.state = {};
        this.dispatcher = ReactFebrest.createDispatcher(this, this._onDispatch);
        this.dispatcher.watch(this._onProviderChange);
    }
    componentDidMount() {
        this._fetchData();
    }
    componentWillUnmount() {
        this.dispatcher.release();
    }

    _add = () => {
        let navigation = this.getScreen().getNavigation();
        navigation.navigate('CreateCollection')
    }

    _fetchData = () => {
        this.dispatcher.dispatch(ACTIONS.GET_COLLECTION_LIST);
    }

    _onDispatch = (data) => {
        let navigation = this.getScreen().getNavigation();
        
    }
    _onProviderChange=(change)=>{
        if(change.collectionList){
            this._fetchData();
        }
    }
    _onCollectionPress=(item)=>{
        let navigation = this.getScreen().getNavigation();
        navigation.navigate('Collection',{id:item.id,title:item.name});
    }
    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={()=>this._onCollectionPress(item)}
                style={styles.item}>
                <View
                    style={styles.nameWrapper}>
                    <Text
                        style={styles.name}>{item.name}</Text>
                </View>
                <View
                    style={styles.row}>
                    <View>
                        <Text
                            style={styles.tips}>共{item.count}篇</Text>
                    </View>
                    <View
                        style={styles.left}>
                        <Text
                            style={styles.tips}>上次读到</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    _keyExtractor = (item) => {
        return item.id + '';
    }
    render() {
        let { collectionList } = this.state;

        return (
            <View
                style={styles.wrapper}>
                <ListView
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    data={collectionList} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff'
    },
    item:{
        paddingLeft:currentTheme.paddingHorizontal,
        marginRight:currentTheme.paddingHorizontal,
        borderBottomWidth:currentTheme.px,
        borderBottomColor:currentTheme.borderColor,
        paddingVertical:5
    },
    name:{
        color:'#333',
        fontSize:currentTheme.f3
    },
    nameWrapper:{
        marginBottom:8
    },
    row:{
        flexDirection:'row'
    },
    left:{
        flex:1,
        alignItems:'flex-end'
    },
    tips:{
        color:'#333',
        fontSize:currentTheme.f2,
        fontWeight:'200'
    }

});

export default Collection;