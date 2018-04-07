'use strict'
import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';

import ScreenComponent from './../../components/ScreenComponent';

import { Theme } from 'react-native-improver';
import ReactFebrest from 'react-febrest';
import ACTIONS from '../../../constants/ACTIONS';
import RightButton from './../../components/RightButton';

const currentTheme = Theme.getTheme();
class CreateCollection extends ScreenComponent {
    constructor(...props) {
        super(...props);
        this.navigationOptions = {
            title: '新建诗集',
            rightButton:<RightButton 
                            text='保存'
                            onPress={this._save}/>
        }
        this.state = {
            value:'我的诗集'
        };
        this.dispatcher = ReactFebrest.createDispatcher(this, this._onDispatch)
    }
    componentDidMount() {
    }
    componentWillUnmount() {
        this.dispatcher.release();
    }
    _onDispatch = (data) => {
     
    }
    _save=()=>{
        let {
            value
        } = this.state;
        if(!value){
            this.getScreen().toast('输入内容为空');
            return;
        }
        this.dispatcher.dispatch(ACTIONS.CREATE_COLLECTION,{collectionName:this.state.value})
    }
    _onTextChange=(value)=>{
        this.setState({value});
    }
    render() {
        return (
            <View
                style={styles.wrapper}>
                <View
                    style={styles.row}>
                    <TextInput 
                        value={this.state.value}
                        onChangeText={this._onTextChange}
                        placeholder='请输入内容'
                        style={styles.input}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
    },
    row:{
        flexDirection:'row',
        paddingHorizontal:5,
        backgroundColor:'#fff'

    },
    input:{
        fontSize:14,
        paddingVertical:8,
        flex:1,
        color:'#333'
    }
});

export default CreateCollection;