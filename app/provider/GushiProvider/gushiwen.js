
import fetchData from './fetchData';
import SQLite from 'react-native-sqlite-storage';

const TYPES = {
    INDEX: 'index',
}
const db = SQLite.openDatabase({ name: "main", createFromLocation: "~data/data.db" });

function sqliteSuccess(params) {

}
function sqliteError(err) {
    console.log(err)
    /**
     *抛出异常及时处理
    */
    // throw new Error(err)
}

const EVERY_DAY_MIN = new Date(2018,1,28).getTime();
const EVERY_DAY_MAX = new Date(2019,1,27).getTime();
const TODAY = new Date();
const TODAY_ZERO = new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate()).getTime();
//每日数据
function getEveryDay(state, payload) {
    const every_day = payload.every_day;
    let date = every_day.map(function(offset,i){
        //数据库存储的时候多了.0
        //暂时先不修
        let day = TODAY_ZERO+offset*24*3600000+'.0';
        if(offset>-0){
            day='null';
        }
        return day;
    });
    
    // if(start_date<EVERY_DAY_MIN){
    //     start_date = EVERY_DAY_MIN;
    //     //offset = EVERY_DAY_MIN
    // }
    return new Promise(function(resolve){
        db.transaction((tx) => {
            const sqlString = `select * from every_day inner join mingju on  every_day.mingju = mingju.pageid 
            inner join shi on shi.pageid = every_day.shi
            where ${date.reduce((pre,item,i)=>{
                if(pre){
                    pre = pre +' or ';
                }else{
                    pre ='';
                }
                pre =pre+' date = '+item;
                return pre;
            },'')}`;
            tx.executeSql(
                sqlString
                , [], (tx, results) => {
                    let rows = results.rows;
                    let len = rows.length;
                    resolve(date.map(function(day){
                        for(let i =0;i<len;i++){
                            let item = rows.item(i);
                            if(item['date']===day){
                                let newItem = {
                                    date:parseInt(item.date),
                                    mingju:item.text,
                                    pic:item.pic,
                                    shi:{
                                        title:item.title,
                                        author:item.author,
                                        content:JSON.parse(item.content),
                                        pageid:item.pageid,
                                        age:item.age
                                    }
                                }
                                return newItem;
                            }
                        }
                        return null;
                    }));
                }, sqliteError);
        }, sqliteError,sqliteError);
    })
}

//首页获取古籍
function fetchGuji(state = {}, payload) {
    var params = state.params || {}
    var page = params.page || 0;
    if (payload.loadMore || params.page == 0) {
        params.page++;;
    } else {
        return state;
    }
    var url = `guwen/Default.aspx?p=${params.page}`;
    var data = state.data || [];
    return fetchData(url).then(function (content) {
        return parseGujiToList(content);
    }).then(function (newData) {
        data = data.concat(newData);
        return {
            params,
            data
        }
    });
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
]

methodList.forEach(item => injectMethod(item.type, item.method));

export default {
    fetchBySourceType
}