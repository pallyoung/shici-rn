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
import Icon from './../../components/Icon';
import DeleteButton from './DeleteButton';

const currentTheme = Theme.getTheme();

class CollectionManager extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '批量删除'
        }
        this.state = {
            selected: {

            }
        }
        this.dispatcher = ReactFebrest.createDispatcher(this, this._onDispatch);
        this.dispatcher.watch(this._onProviderChange);
    }
    componentDidMount() {
        this._fetchData();
    }
    _selected = (item) => {
        this.state.selected[item.id] = !this.state.selected[item.id];
        this.setState({
            now: Date.now()
        });
    }
    _fetchData = () => {
        this.dispatcher.dispatch(ACTIONS.GET_COLLECTION_LIST);
    }
    _deleteCollection=()=>{
        let selected = this.state.selected;
        let payload = [];
        for(let o in selected){
            if(selected[o]){
                payload.push(o);
            }
        }
        this.dispatcher.dispatch(ACTIONS.REMOVE_COLLECTION,payload);
    }
    _onDispatch = (data) => {
        let navigation = this.getScreen().getNavigation();

    }
    _onProviderChange = (change) => {
        if (change.collectionList) {
            this._fetchData();
        }
    }
    _renderItem = ({ item }) => {
        let iconName = 'ios-radio-button-off-outline';
        let selected = this.state.selected;
        if (selected[item.id]) {
            iconName = 'ios-checkmark-circle';
        }
        return (
            <View
                style={styles.itemWrapper}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this._selected(item)}
                    style={styles.item}>
                    <Icon
                        size={20}
                        color='#56a36c'
                        name={iconName} />
                    <View
                        style={styles.itemMain}>
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
                    </View>
                </TouchableOpacity>
            </View>
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
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    data={collectionList} />
                <DeleteButton
                    onPress={this._deleteCollection}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    itemWrapper:{
        backgroundColor: '#fff'
    },
    item: {
        paddingLeft: currentTheme.paddingHorizontal,
        marginRight: currentTheme.paddingHorizontal,
        borderBottomWidth: currentTheme.px,
        borderBottomColor: currentTheme.borderColor,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemMain: {
        flex: 1,
        marginLeft: 10
    },
    name: {
        color: '#333',
        fontSize: currentTheme.f3
    },
    nameWrapper: {
        marginBottom: 8,
        flexDirection: 'row'
    },
    row: {
        flexDirection: 'row'
    },
    left: {
        flex: 1,
        alignItems: 'flex-end'
    },
    tips: {
        color: '#333',
        fontSize: currentTheme.f2,
        fontWeight: '200'
    }

});
export default CollectionManager;