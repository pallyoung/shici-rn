'use strict'
import { Provider } from 'febrest';
import SQLiteHelper from './SQLiteHelper';

function executeSql(sql) {
    return SQLiteHelper.executeSql('user', sql);
}

function updateSql(table_name, data, keys) {
    return data.map(function (item) {
        return `insert or replace into ${table_name} (${keys.join(',')}) values (${item.join(',')})`;
    })
}

function removeSql(table_name, data, condition) {
    return data.map(function (item) {
        return `DELETE from ${table_name} where ${condition(item)}`;
    })
}
function classify(data, condition, map) {
    var update = [];
    var remove = [];
    data.forEach(function (item) {
        if (condition(item)) {
            update.push(map.map((key) => {
                if (!item[key]) {
                    return 'null';
                } else {
                    if (!/^[\d]+$/.test(item[key])) {
                        return `"${item[key]}"`;
                    }
                    return item[key];
                }
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

const FAV_COLUMN_MAP = ['id', 'user_id', 'content_id', 'content_type', 'created_time'];

const COLLECTION_LIST_COLUMN_MAP = ['id', 'name', 'user_id', 'cover', 'bookmark', 'last_read_time', 'read_times', 'updated_time', 'created_time'];

const COLLECTION_COLUMN_MAP = ['id', 'collection_id', 'content_id', 'content_type', 'created_time'];


function commonCondition(item) {
    if (item.itemRemove) {
        return false;
    } else {
        if (!item.created_time) {
            item.created_time = Date.now();
        }
        item.updated_time = Date.now();
        return true;
    }
}

function removeCondition(item) {
    return 'id = ' + item[0];
}
const handlers = {
    fav: {
        setState: function (state) {
            const table_name = 'fav';
            if (!state.data) {
                return;
            }
            let { remove, update } = classify(state.data, commonCondition, FAV_COLUMN_MAP);
            let sqlString = updateSql(table_name, update, FAV_COLUMN_MAP).concat(removeSql(table_name, remove, removeCondition)).join('union');

            executeSql(sqlString)
        },
        getState: function (state, payload) {
            const sqlString = `select fav.id as id,fav.content_id as content_id,fav.content_type as content_type,
                                shi.id as c_id, shi.author as author,shi.content as content,
                                shi.pageid as pageid,shi.age as age from fav as fav
                                inner join content.shi as shi on fav.content_id = shi.pageid 
                                where user_id = ${payload.user_id || 1}`;
            const sqlString2 = `select fav.id as id,fav.content_id as content_id,fav.content_type as content_type,
                                mingju.id as c_id, mingju.pageid as pageid,mingju.text as text from fav
                                inner join content.mingju as mingju on fav.content_id = mingju.pageid 
                                where user_id = ${payload.user_id || 1}`;
            var result = {

            }
            return executeSql(sqlString).then(results => {
                let rows = results.rows;
                let len = rows.length;
                let items = [];
                for (let i = 0; i < len; i++) {
                    let item = rows.item(i);
                    let newItem = {
                        id: item.id,
                        content_id: item.pageid,
                        content_type: item.content_type,
                        content: {
                            title: item.title,
                            author: item.author,
                            content: JSON.parse(item.content),
                            pageid: item.pageid,
                            age: item.age,
                            isFav: true,
                            fav_id: item.id
                        }
                    }
                    items.push(newItem);
                }
                result.shi = items;
                return executeSql(sqlString2);
            }).then(results => {
                let rows = results.rows;
                let len = rows.length;
                let items = [];
                for (let i = 0; i < len; i++) {
                    let item = rows.item(i);
                    let newItem = {
                        id: item.id,
                        content_id: item.pageid,
                        content_type: item.content_type,
                        content: {
                            text: item.text,
                            pageid: item.pageid,
                            isFav: true,
                            fav_id: item.id
                        }
                    }
                    items.push(newItem);
                }
                result.mingju = items;
                return result;
            });
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
    },
    collectionList: {
        setState: function (state) {
            const table_name = 'collection_list';
            
            if (!state) {
                return;
            }
            let { remove, update } = classify(state, commonCondition, COLLECTION_LIST_COLUMN_MAP);
            let sqlString = updateSql(table_name, update, COLLECTION_LIST_COLUMN_MAP).concat(removeSql(table_name, remove, removeCondition)).join('union');
            executeSql(sqlString);

        },
        getState: function (state, payload) {
            const sqlString = `select * from collection_list as clist  where user_id = ${payload.id || 1}`;
            const sqlString2 = `select count(collection_id),collection_id from collection  where user_id = ${payload.id || 1}`;
            let list,countList;
            return executeSql(sqlString2).then(function (results) {
                let rows = results.rows;
                let len = rows.length;
                countList = {};
                for (let i = 0; i < len; i++) {
                    let item = rows.item(i);
                    countList[item.collection_id] = item.count;
                }
                return executeSql(sqlString);
            }).then(function(results){
                let rows = results.rows;
                let len = rows.length;
                list = [];
                for (let i = 0; i < len; i++) {
                    let item = rows.item(i);
                    item.count = countList[item.id]||0;
                    list.push(item);
                }
                return list;
            })
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
        return handlers[this.sourceType].setState(state);
    }
    get(payload = {}) {
        return handlers[this.sourceType].getState(this.state, payload);
    }
}


export default UserProvider;

