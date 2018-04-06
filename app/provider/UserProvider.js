'use strict'
import { Provider } from 'febrest';
import SQLiteHelper from './SQLiteHelper';

function executeSql(sql){
    return SQLiteHelper.executeSql('user',sql);
}

function updateSql(table_name, data,keys) {
    return data.map(function(item){
        return `insert or replace ${table_name} (${keys.join(',')}) values(${item.join(',')})`;
    })
}

function removeSql(table_name,data, condition) {
    return data.map(function(item){
        return `DELETE from  ${table_name} where ${condition(item)}`;
    })
}
function classify(data, condition, map) {
    var update = [];
    var remove = [];
    data.forEach(function (item) {
        if (condition(item)) {
            update.push(map.map((key) => {
                return item[key]||'';
            }))
        } else {
            remove.push(map.map((key) => {
                return item[key];
            }))
        }
    });
    return {
        update,
        remove
    }
}

const FAV_COLUMN_MAP = ['id','user_id','content_id','content_type','created_time'];

const COLLECTION_COLUMN_MAP = ['id','collection_name','cover','bookmark','last_read_time','read_times','updated_time','created_time'];

const COLLECTION_LIST_COLUMN_MAP = ['id','collection_id','content_id','content_type','created_time'];


function commonCondition(item){
    if(item.itemRemove){
        return false;
    }else{
        if(!item.created_time){
            item.created_time = Date.now();
        }
        item.updated_time = Date.now();
        return true;
    }
}

function removeCondition(item){
    return 'where id = '+item.id;
}
const handlers = {
    fav: {
        setState: function (state) {
            const table_name = 'fav';
            if (!state.data) {
                return;
            }
            let {remove,update} = classify(state.data,commonCondition,FAV_COLUMN_MAP);
            let sqlString = updateSql(table_name,update,).concat(removeSql(table_name,remove,removeCondition)).join('union');
            console.log(sqlString)
            executeSql(sqlString)

        },
        getState: function (state,payload) {
            const sqlString = `select * from fav where user_id = ${payload.user_id}`;
            return executeSql(sqlString);
        }
    },
    user: {
        setState: function () {

        },
        getState: function () {

        }
    },
    collection: {
        setState: function () {

        },
        getState: function () {

        }
    }
}

function setState(type, state) {
    var tablename = state.type;
    let data = state.data;
}
function getState(state, payload) {

}
class UserProvider extends Provider {
    sourceType: string;
    constructor(config) {
        super(config);
        this.state = config.state || {};
        this.sourceType = config.sourceType;
    }
    set(state) {
        this.state = state;
        return setState(this.sourceType, state);
    }
    get(payload = {}) {
        return [];
    }
}


export default UserProvider;