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

function Row(props){
    return (
        <TouchableOpacity
            onPress={()=>props.action&&props.dispatcher.dispatch(props.action)}
            activeOpacity={1}
            style={[styles.row,props.isLast&&styles.divide]}>
            <Text
                style={styles.text}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}

class Menu extends ScreenComponent{
    constructor(...props){
        super(...props);
        this.state = {
            appMenu:null
        }
        this.dispatcher = ReactFebrest.createDispatcher(this,this._onDispatch);

        this._translateXValue = new Animated.Value(-275);
    }
    componentDidMount() {
        this.dispatcher.dispatch(ACTIONS.APP_MENU);
        Animated.timing(this._translateXValue,{
            toValue:0,
            duration:200,
            easing:Easing.linear
        }).start();

    }
    componentWillUnmount(){
        this.dispatcher.release();
    }
    _close=()=>{
        Animated.timing(this._translateXValue,{
            toValue:-275,
            duration:200,
            easing:Easing.linear
        }).start(()=>{
            this.props.onClose();
        });
    }
    _onDispatch(data){

    }
    
    _renderMenu(menu){
        if(!menu){
            return null;
        }
        let rows = [];

        menu.forEach((item,i)=>{
            if(Array.isArray(item)){
                item.forEach((_item,i,list)=>{
                    rows.push(this._renderItem(_item,i===list.length-1));
                })
            }
        });
        return rows;
        
    }
    _renderItem(item,isLast){
        return (
            <Row 
                key={item.title}
                action={item.action}
                text={item.title}
                isLast={isLast}/>
        );
    }

    render(){
        let {appMenu} = this.state;
        return (
            <TouchableOpacity 
                onPress={this._close}
                activeOpacity={1}
                style={[styles.wrapper]}>
                <Animated.View
                    activeOpacity={1}
                    style={[styles.container,{transform:[{translateX:this._translateXValue}]}]}>
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
                                    name='ios-settings'/>
                                <Text style={[styles.text,{marginLeft:8}]}>设置</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.footerButton}>
                                <Icon 
                                    size={20}
                                    name='md-exit'/>
                                <Text style={[styles.text,{marginLeft:8}]}>退出</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:'rgba(80,80,80,0.5)',
        flexDirection:'column'
    },
    container:{
        flex:1,
        width:275,
        backgroundColor:'#fefefe',
    },
    main:{
        flex:1,  
        paddingHorizontal:20,
        paddingTop:64
    },
    row:{
        paddingVertical:12,
        flexDirection:'row'
    },
    divide:{
        marginBottom:20
    },
    text:{
        color:'#333',
        fontSize:currentTheme.f2
    },
    footer:{
        height:44,
        paddingHorizontal:20,
        borderTopWidth:currentTheme.px,
        borderTopColor:currentTheme.borderColor,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    footerButton:{
        flexDirection:'row',
        alignItems:'center',
    }
});
export default Menu;