'use strict'
import React,{Component} from 'react';
import {
    FlatList
}from 'react-native'

class ListView extends Component{
    constructor(...props){
        super(...props)
    }
    render(){
        return <FlatList {...this.props}/>
    }
}

export default ListView;