'use strict'
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ScreenComponent extends Component{
    static childContextTypes = {
        screen:PropTypes.any,
        parent:PropTypes.any
    }
    static contextTypes = {
        screen:PropTypes.any,
        parent:PropTypes.any
    }
    constructor(...props){
        super(...props);
    }
    getScreen(){
        return this.context.screen;
    }
    getParent(){
        return this.context.parent;
    }
    getChildContext() {
        return { parent: this,screen:this.context.screen };
    }
}

export default ScreenComponent;