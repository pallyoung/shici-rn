'use strict'
import {Provider} from 'febrest';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: "main", createFromLocation: "~data/user.db" });

class UserProvider extends Provider{
    params:any;
    sourceType:string;
    constructor(config){
        super(config);
        this.state = config.state||{};
        this.sourceType = config.sourceType;
    }
    set(state){
        
    }
    get(payload={}){
        return [];
    }
}


export default GushiProvider;