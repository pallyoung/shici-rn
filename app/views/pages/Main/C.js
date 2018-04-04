'use strict'
import React,{Component} from 'react';

class C extends Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }
    componentWillUnmount() {
        this.state.child = null;
    }
    componentDidUpdate(prevProps, prevState) {
        this._resolve&&this._resolve();
        this._resolve = null;
    }
    
    
    setChild(child){
        this.setState({child});
        return new Promise((resolve)=>{
            this._resolve = resolve;
        });
    }
    render(){
        return this.state.child||null;
    }
}

export default C;