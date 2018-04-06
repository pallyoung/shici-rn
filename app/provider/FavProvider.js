'use strict'
import {Provider} from 'febrest';
import SQLiteHelper from './SQLiteHelper';

function setState(type,state){
    var tablename = state.type;

}
function getState(state){
    
}
class FavProvider extends Provider{
    sourceType:string;
    constructor(config){
        super(config);
        this.state = config.state||{};
        this.sourceType = config.sourceType;
    }
    set(state){
        this.state = state;
        return setState(this.sourceType,state);
    }
    get(payload={}){
        return [];
    }
}


export default GushiProvider;