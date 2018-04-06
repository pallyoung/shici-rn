
import fetchData from './fetchData';
import SQLite from 'react-native-sqlite-storage';

const TYPES = {
    INDEX: 'index',
}
const db = SQLite.openDatabase({ name: "main", createFromLocation: "~data/data.db" });

function sqliteSuccess(params) {

}
function sqliteError(err) {
    console.log(err, 'err')
    /**
     *抛出异常及时处理
    */
    // throw new Error(err)
}

const EVERY_DAY_MIN = new Date(2018, 1, 28).getTime();
const EVERY_DAY_MAX = new Date(2019, 1, 27).getTime();
const TODAY = new Date();
const TODAY_ZERO = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()).getTime();
//每日数据
function getEveryDay(state, payload) {
    const every_day = payload.every_day;
    let date = every_day.map(function (offset, i) {

        let day = TODAY_ZERO + offset * 24 * 3600000;
        if (day < EVERY_DAY_MIN) {
            day = 'null';
        } else if (offset > 0) {
            day = 'null';
        }
        return day;
    });

    // if(start_date<EVERY_DAY_MIN){
    //     start_date = EVERY_DAY_MIN;
    //     //offset = EVERY_DAY_MIN
    // }
    return new Promise(function (resolve) {
        db.transaction((tx) => {
            const sqlString = `select * from every_day inner join mingju on  every_day.mingju = mingju.pageid 
            inner join shi on shi.pageid = every_day.shi
            where ${date.reduce((pre, item, i) => {
                    if (pre) {
                        if (item != 'null') {
                            pre = pre + ' or ';
                            pre = pre + ' date = ' + '"' + item + '"';
                        }
                    } else {
                        pre = ' date = ' + '"' + item + '"';
                    }
                    return pre;
                }, '')}`;
            tx.executeSql(
                sqlString
                , [], (tx, results) => {
                    let rows = results.rows;
                    let len = rows.length;
                    let itemMap = {

                    }
                    for (let i = 0; i < len; i++) {
                        let item = rows.item(i);
                        itemMap[item['date']] = {
                            date: parseInt(item.date),
                            mingju: item.text,
                            pic: item.pic,
                            shi: {
                                title: item.title,
                                author: item.author,
                                content: JSON.parse(item.content),
                                pageid: item.pageid,
                                age: item.age
                            }
                        };
                    }
                    resolve(date.map(function (day, i) {
                        let item = itemMap[day] || null;
                        if (item) {
                            item.offset = every_day[i]
                        };
                        return item;
                    }));
                }, sqliteError);
        }, sqliteError, sqliteSuccess);
    })
}


/*mingju列表*/
function getMingjuList(state = {}, payload) {
    var lastid = state.lastid || 0;
    var start = lastid-25;
    var end = lastid + 25;
    if (payload.isTop) {
        start = lastid - 25;
        end = lastid+25;
    }
    if(start<0){
        start = 0;
    }
    if(end<0){
        end=0;
    }
    return new Promise(function (resolve) {
        db.transaction((tx) => {
            const sqlString = `select * from mingju limit ${start},${end}`;
            tx.executeSql(
                sqlString
                , [], (tx, results) => {
                    let rows = results.rows;
                    let len = rows.length;
                    let items = [];
                    for (let i = 0; i < len; i++) {
                        let item = rows.item(i);
                        items.push(item);
                        lastid = item.id-1;
                    }
                    resolve({
                        lastid,
                        items
                    });
                }, sqliteError);
        }, sqliteError, sqliteSuccess);
    })
}
/*诗文列表*/

function getShiList(state = {}, payload) {
    var lastid = state.lastid || 0;
    var start = lastid-25;
    var end = lastid + 25;
    if (payload.isTop) {
        start = lastid - 25;
        end = lastid+25;
    }
    if(start<0){
        start = 0;
    }
    if(end<0){
        end=0;
    }
    return new Promise(function (resolve) {
        db.transaction((tx) => {
            const sqlString = `select * from shi limit ${start},${end}`;
            tx.executeSql(
                sqlString
                , [], (tx, results) => {
                    let rows = results.rows;
                    let len = rows.length;
                    let items = [];
                    for (let i = 0; i < len; i++) {
                        let item = rows.item(i);
                        item.content = JSON.parse(item.content);
                        items.push(item);
                        lastid = item.id-1;
                    }
                    resolve({
                        lastid,
                        items
                    });
                }, sqliteError);
        }, sqliteError, sqliteSuccess);
    })
}
function fetchBySourceType(sourceType, state, payload) {
    return methods[sourceType](state, payload);
}




//
const methods = {};

function injectMethod(type, method) {
    methods[type] = method;
}

const methodList = [
    { type: 'every_day', method: getEveryDay },
    { type: 'shi_list', method: getShiList },
    { type: 'mingju_list', method: getMingjuList }
]

methodList.forEach(item => injectMethod(item.type, item.method));

export default {
    fetchBySourceType
}