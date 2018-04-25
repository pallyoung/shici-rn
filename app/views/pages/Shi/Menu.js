'use strict'
import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import {
    Theme
} from 'react-native-improver';

import Icon from './../../components/Icon';
import Febrest from 'febrest';
import ACTIONS from '../../../constants/ACTIONS';

const currentTheme = Theme.getTheme();

const buttons = [
    {
        text:'收藏',
        icon:'ios-cube-outline',
        onPress:(props)=>Febrest.dispatch(ACTIONS.ADD_FAV,{
                                                            content_id:props.id,
                                                            user_id:1,
                                                            content_type:props.type
                                                        })
    },
    {
        text:'加入诗集',
        icon:'ios-add-circle-outline',
    }
];

function renderButtons(props) {
    return buttons.map(button => {
        return <Button
            key={button.text}
            {...button}
            {...props} />
    })
}
function Button(props) {
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.button}
            onPress={()=>props.onPress(props)}>
            <View
                style={styles.buttonIcon}>
                <Icon
                    size={30}
                    name={props.icon} />
            </View>
            <Text
                style={styles.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    )
}
function Menu(props) {
    let id = props.id;
    return (
        <View
            activeOpacity={1}
            style={styles.wrapper}>
            <View
                style={styles.top}>
                <Text
                    style={styles.title}>
                    {props.title}
                </Text>
            </View>
            <View
                style={styles.buttons}>
                {renderButtons(props)}
            </View>
            <TouchableOpacity
                activeOpacity={1}
                style={styles.cancel}
                onPress={props.onClose}>
                <Text
                    style={styles.cancelText}>取消</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#f3f3f3',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    top: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        borderBottomWidth: currentTheme.px,
        borderBottomColor: currentTheme.borderColor
    },
    title: {
        color: '#333',
        fontWeight: '200',
        fontSize: 13
    },
    buttons:{
        flexDirection:'row',
        flexWrap:'wrap',
        paddingHorizontal:12,
        borderBottomWidth: currentTheme.px,
        borderBottomColor: currentTheme.borderColor
    },
    button:{
        width:80,
        paddingTop:12,
        paddingBottom:12,
        alignItems:'center'
    },
    buttonIcon:{
        height:40,
        width:40,
        borderRadius:5,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'

    },
    buttonText:{
        fontSize:12,
        marginTop:10,
        fontWeight:'200',
        color: '#333',
    },
    cancel: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancelText: {
        color: '#333',
        fontWeight: '200',
        fontSize: 18
    }
});
export default Menu;