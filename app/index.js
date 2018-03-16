'use strict'
import config from './config';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppState,
    InteractionManager,
    TouchableOpacity,
} from 'react-native';
import { Theme } from 'react-native-improver';
var currentTheme = Theme.getTheme();
import { StackNavigator } from 'react-navigation';
import Routes from './views/routes/Routes';
import { NativeManager } from './native';
import BuildConfig from './BuildConfig';
import Loading from './views/components/Loading';
import Screen from './views/components/Screen'

function createNavigation(initialRouteName, initialRouteParams) {
    return StackNavigator(Routes, {
        initialRouteName,
        initialRouteParams,
    });
}
class Entry extends Component {
    constructor(...props) {
        super(...props);
        global.APPContext = this;
        this._isLoginPopupShow = false;
        this._loginPopupId;
        this._isLoadinViewShow = false;
        this.state = {
            inited: false,
            navigation: null,
            navigationKey: 0
        }

    }
    componentWillMount() {

    }
    componentDidMount() {
        APPContext.Routes = Routes;

        InteractionManager.runAfterInteractions(() => {

            let initialRouteName = NativeManager.ENV === 'DEBUG' ? 'PageList' : 'Main';
            this.state.navigation = createNavigation(initialRouteName);
            this.setState({ inited: true });
            InteractionManager.runAfterInteractions(() => NativeManager.hideLoadingView())
        });

    }
    resetNavigator(initialRouteName, initialRouteParams) {
        initialRouteName = initialRouteName || NativeManager.ENV === 'DEBUG' ? 'PageList' : 'Main';
        this.setState({
            inited: true,
            navigationKey: this.state.navigationKey + 1,
            navigation: createNavigation(initialRouteName, initialRouteParams)
        });
    }
    render() {
        var Navigation = this.state.navigation;
        if (!this.state.inited) {
            return null;
        }
        return <Navigation />
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: currentTheme.backgroundColor,
        flex: 1,
        flexDirection: 'column'
    }
});

export default Screen(Entry);