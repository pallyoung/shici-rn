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
import {NativeManager} from './native'
import BuildConfig from './BuildConfig';
import Screen from './views/components/Screen';
import ReactFebrest from 'react-febrest';
import DataLoading from './views/components/DataLoading';
import Actions from './constants/ACTIONS';

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
        this.state = {
            inited: false,
            navigation: null,
            navigationKey: 0
        }
        this.dispatcher = ReactFebrest.createDispatcher(this,this._onDispatch)

    }
    componentWillMount() {

    }
    componentDidMount() {
        APPContext.Routes = Routes;

        InteractionManager.runAfterInteractions(() => {
            this.dispatcher.dispatch(Actions.INIT)
            let initialRouteName = BuildConfig.ENV === 'DEBUG' ? 'PageList' : 'Main';
            this.state.navigation = createNavigation(initialRouteName);
            // this.setState({ inited: true });
            InteractionManager.runAfterInteractions(() => NativeManager.hideLoadingView())
        });

    }
    _onDispatch(data){
        
    }
    resetNavigator(initialRouteName, initialRouteParams) {
        initialRouteName = initialRouteName || BuildConfig.ENV === 'DEBUG' ? 'PageList' : 'Main';
        this.setState({
            inited: true,
            navigationKey: this.state.navigationKey + 1,
            navigation: createNavigation(initialRouteName, initialRouteParams)
        });
    }
    render() {
        var Navigation = this.state.navigation;
        if (!this.state.inited) {
            return (
                <DataLoading />
            );
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