'use strict'
import React from 'react';
import {
    View,
    ListView,
    SectionList,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';

import { Theme } from 'react-native-improver';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenComponent from './../../components/ScreenComponent';

import Top from './Top';
import Tail from './Tail';
var currentTheme = Theme.getTheme();

class Page extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.state = {
            data: {}
        };
    }
    componentDidUpdate() {
        this._resolve && this._resolve();
        this.props.name&&this.getScreen().toast('update'+this.props.name,2000)
        this._resolve = null;
    }
    _onLayout = (e) => {
        const { layout: { height, width } } = e.nativeEvent;
        if (this.state.height !== height || this.state.width !== width) {
            this.setState({ height, width });
        }
    }
    update(data) {
        if (data == null) {
            data = {};
        }
        return new Promise((resolve) => {
            this._resolve = resolve;
            this.setState({ data });
        });

    }
    render() {
        const {
            height,
            width,
            data
        } = this.state;

        const {
            mingju,
            pic,
            shi,
            date
        } = data;
        return (
            <ScrollView
                onLayout={this._onLayout}
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={[this.props.style || { flex: 1 }]}>
                {date && <Top
                    height={height}
                    width={width}
                    image={pic}
                    text={mingju}
                    date={date}
                />}
                {shi && <Tail
                    {...shi} />}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#eeddff'
    }
});
export default Page;