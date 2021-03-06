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
    Animated,
    Easing
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import { Theme } from 'react-native-improver';
import ReactFebrest from 'react-febrest';
import ACTIONS from '../../../constants/ACTIONS';
import Icon from './../../components/Icon';

const currentTheme = Theme.getTheme();

const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);


function I(props){
    let icon = props.icon;
    if(!icon){
        return null;
    }
    return (
        <View
            style={{width:25}}>
            <Icon 
                size={18}
                name={icon}/>
        </View>
        
    )
}

function Row(props) {
    return (
        <TouchableOpacity
            onPress={() => props.action && props.dispatcher.dispatch(props.action)}
            activeOpacity={1}
            style={[styles.row, props.isLast && styles.divide]}>
            <I 
                icon={props.icon}/>
            <Text
                style={styles.text}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}

class Menu extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.state = {
            appMenu: null
        }
        this.dispatcher = ReactFebrest.createDispatcher(this, this._onDispatch);

        this._translateXValue = new Animated.Value(-275);
    }
    componentDidMount() {
        this.dispatcher.dispatch(ACTIONS.APP_MENU);
        Animated.timing(this._translateXValue, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear
        }).start();

    }
    componentWillUnmount() {
        this.dispatcher.release();
    }
    _close = () => {
        Animated.timing(this._translateXValue, {
            toValue: -275,
            duration: 200,
            easing: Easing.linear
        }).start(() => {
            this.props.onClose();
        });
    }
    _onDispatch(data) {

        const navigation = this.getScreen().getNavigation();
        switch (data.key) {
            case ACTIONS.APP_EXIT:
                return true;
            case ACTIONS.APP_SETTING:
                return true;
            case ACTIONS.APP_MENU_COLLECTION:
                this._close();
                navigation.navigate('CollectionList');
                return true;
            case ACTIONS.APP_MENU_FAV:
                this._close();
                navigation.navigate('Fav');
                return true;
            case ACTIONS.APP_MENU_HISTROY:
                this._close();
                navigation.navigate('History');
                return true;
            case ACTIONS.APP_MINGJU:
                this._close();
                navigation.navigate('Mingju');
                return true;
            case ACTIONS.APP_SHI:
                this._close();
                navigation.navigate('Shi');
                return true;
        }
    }

    _renderMenu(menu) {
        if (!menu) {
            return null;
        }
        let rows = [];

        menu.forEach((item, i) => {
            if (Array.isArray(item)) {
                item.forEach((_item, i, list) => {
                    rows.push(this._renderItem(_item, i === list.length - 1));
                })
            }
        });
        return rows;

    }
    _renderItem(item, isLast) {
        return (
            <Row
                dispatcher={this.dispatcher}
                key={item.title}
                action={item.action}
                text={item.title}
                icon={item.icon}
                isLast={isLast} />
        );
    }

    render() {
        let { appMenu } = this.state;
        return (
            <TouchableOpacity
                onPress={this._close}
                activeOpacity={1}
                style={[styles.wrapper]}>
                <Animated.View
                    activeOpacity={1}
                    style={[styles.container, { transform: [{ translateX: this._translateXValue }] }]}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.container}>
                        <View
                            style={styles.main}>
                            {this._renderMenu(appMenu)}
                        </View>
                        <View
                            style={styles.footer}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.footerButton}>
                                <Icon
                                    size={20}
                                    name='ios-settings' />
                                <Text style={[styles.text, { marginLeft: 8 }]}>设置</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.footerButton}>
                                <Icon
                                    size={20}
                                    name='md-exit' />
                                <Text style={[styles.text, { marginLeft: 8 }]}>退出</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'rgba(80,80,80,0.5)',
        flexDirection: 'column'
    },
    container: {
        flex: 1,
        width: 275,
        backgroundColor: '#fefefe',
    },
    main: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 64
    },
    row: {
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems:'center'
    },
    divide: {
        marginBottom: 20
    },
    text: {
        color: '#333',
        fontSize: currentTheme.f2
    },
    footer: {
        height: 44,
        paddingHorizontal: 20,
        borderTopWidth: currentTheme.px,
        borderTopColor: currentTheme.borderColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    footerButton: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
export default Menu;