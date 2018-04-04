'use strict'
import React from 'react';
import {
    View,
    ScrollView,
    SectionList,
    FlatList,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import ReactFebrest from 'react-febrest';
import ACTIONS from '../../../constants/ACTIONS';
import ListView from './../../components/ListView';
import { Theme } from 'react-native-improver';

const currentTheme = Theme.getTheme();


const TOADY = new Date();
function getDateString(times) {
    var date = new Date(times);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
}
function getDateString2(times) {
    var date = new Date(times);
    let month = date.getMonth() + 1;
    if(month<10){
        month = '0'+month;
    }
    let day = date.getDate();

    if(day<10){
        day = '0'+day;
    }
    return `${date.getFullYear()}/${month}/${day}`;
}
function getOffset(deadline) {
    var days = Math.ceil((TOADY.getTime() - deadline) / 86400000);

    var offset = [];
    for (let i = 0; i < days; i++) {
        offset.push(-i);
    }
    return offset;
}
function preMonth(time) {
    var date = new Date(time);
    if (date.getMonth() == 0) {
        return new Date(date.getFullYear() - 1, 11, 1).getTime();
    } else {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1).getTime();
    }
}

function Item(props) {
    return (
        <View
            style={styles.item}>
            {
                props.dataSource.map(function (item, i) {
                    return (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[styles.itemSingle]}
                            key={item.date}>
                            <Image
                                source={{
                                    uri: item.pic,
                                    headers: {
                                        'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36'
                                    }
                                }}
                                style={styles.itemImage}
                                resizeMode='center'
                            />
                            <View
                                style={styles.itemDateWrapper}>
                                <Text
                                    style={styles.itemDate}>
                                    {getDateString2(item.date)}
                                </Text>
                            </View>

                        </TouchableOpacity>
                    );
                })
            }
        </View>
    );


}
function Header(props) {
    return (
        <View
            style={styles.sectionHeader}>
            <Text style={styles.headerText}>{props.text}</Text>
        </View>
    );
}
class History extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '往日旧诗'
        }
        this.state = {

        }
        this._deadline;
        this.dispatcher = ReactFebrest.createDispatcher(this, this._onDispatch);
    }
    componentDidMount() {
        this._fetchData();
    }
    _fetchData=()=> {
        if (!this._deadline) {
            this._deadline = new Date(TOADY.getFullYear(), TOADY.getMonth(), 1).getTime();
        } else {
            this._deadline = preMonth(this._deadline);
        }
        var offset = getOffset(this._deadline);
        if (offset.length < 10) {
            this._deadline = preMonth(this._deadline);
            offset = getOffset(this._deadline);
        }
        this.dispatcher.dispatch(ACTIONS.GET_HISTORY, { every_day: offset });
    }
    _onDispatch = (data) => {

    }
    _renderSectionHeader = ({ section }) => {
        return (
            <Header
                text={getDateString(section.title)} />
        );

    }
    _renderItem = ({ item }) => {
        return (
            <Item
                dataSource={item}
            />
        );
    }
    _keyExtractor(item) {
        return item[0].date;
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <ListView
                    style={styles.listView}
                    type='section'
                    renderSectionHeader={this._renderSectionHeader}
                    renderItem={this._renderItem}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    onEndReached={this._fetchData}
                    keyExtractor={this._keyExtractor}
                    sections={this.state.history || []} />
            </View>
        );
    }
}

const imageWidth = currentTheme.screenWidth / 2 - 50;
const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    listView: {
        flex: 1,
        paddingBottom:60
    },
    sectionHeader: {
        // borderTopWidth: currentTheme.px,
        // borderBottomWidth: currentTheme.px,
        // borderColor: currentTheme.borderColor,
        height: 44,
        backgroundColor: '#f3f3f3',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: currentTheme.f3,
        color: '#333',
        fontWeight: '200'
    },
    item: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    itemSingle: {
        width: imageWidth,
    },
    itemImage: {
        width: imageWidth,
        height: imageWidth * 0.67
    },
    itemDateWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 6
    },
    itemDate: {
        fontSize: 12,
        color: '#666'
    }
})

export default History;