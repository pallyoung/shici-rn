'use strict'
import React, { Component } from 'react';
import {
    FlatList,
    SectionList
} from 'react-native'

class ListView extends Component {
    constructor(...props) {
        super(...props);
        this._lastScroll;
        this._lastTopReached = 0;
        this._lastEndReached = 0;
    }
    _onScroll = ({ nativeEvent }) => {

        let {
            contentOffset,
            contentSize,
            layoutMeasurement
        } = nativeEvent;
        if (!this._lastScrollY) {
            this._lastScrollY = contentOffset.y;
            return;
        }
        let _lastScrollY = this._lastScrollY;
        this._lastScrollY = contentOffset.y;
        let now = Date.now();

        if (_lastScrollY > contentOffset.y && contentOffset.y < 200) {
            if (now - this._lastTopReached > 200) {
                this.props.onTopReached && this.props.onTopReached();
            }
            this._lastTopReached = now;
            return;
        }
        if (_lastScrollY < contentOffset.y && (contentOffset.y + layoutMeasurement.height + 200) > contentSize.height) {
            if (now - this._lastEndReached > 200) {
                this.props.onBottomReached && this.props.onBottomReached();
            }
            this._lastEndReached = now;

            return;
        }
    }
    render() {
        if (this.props.type === 'section') {
            return <SectionList {...this.props} onScroll={this._onScroll} />
        }
        return <FlatList {...this.props} onScroll={this._onScroll} />
    }
}

export default ListView;