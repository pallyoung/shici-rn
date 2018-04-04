'use strict'
import React,{Component} from 'react';
import {
    FlatList,
    SectionList
}from 'react-native'

class ListView extends Component{
    constructor(...props){
        super(...props)
    }
    render(){
        if(this.props.type==='section'){
            return <SectionList {...this.props}/>
        }
        return <FlatList {...this.props}/>
    }
}

export default ListView;