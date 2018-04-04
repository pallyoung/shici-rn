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
    UIManager
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';
import { Theme } from 'react-native-improver';
import ReactFebrest from 'react-febrest';
import ACTIONS from '../../../constants/ACTIONS';

const currentTheme = Theme.getTheme();

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
            appMenu:null,
            translateX:-currentTheme.screenWidth
        }
        this.dispatcher = ReactFebrest.createDispatcher(this,this._onDispatch);
    }
    componentDidMount() {
        this.dispatcher.dispatch(ACTIONS.APP_MENU);
    }
    componentWillUnmount(){
        this.dispatcher.release();
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
            <View style={[styles.wrapper]}>
                <View
                    style={styles.container}>
                    <View
                        style={styles.main}>
                        {this._renderMenu(appMenu)}
                    </View>
                    <View
                        style={styles.footer}>
                    </View>
                </View>
                
            </View>
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
        width:300,
        backgroundColor:'#fefefe',
    },
    main:{
        flex:1,  
        paddingHorizontal:12
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
        fontSize:currentTheme.f3
    },
    footer:{
        height:44,
        borderTopWidth:currentTheme.px,
        borderTopColor:currentTheme.borderColor

    }
});
export default Menu;