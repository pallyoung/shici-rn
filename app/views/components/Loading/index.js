'use strict'
import React,{Component} from 'react';
import {
    Image,
    View,
    ActivityIndicator
} from 'react-native';

class Loading extends Component{
    constructor(...props){
        super(...props);

    }
    render(){
        return <View style = {{
            flex:1,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'rgba(0,0,0,0.28)'
        }}>
            <ActivityIndicator 
                color = 'rgba(0,0,0,0.6)'
                size = 'large' 
                />   
        </View>
    }
}
export default Loading;