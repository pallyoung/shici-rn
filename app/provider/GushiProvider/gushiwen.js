
import SQLiteHelper from './../SQLiteHelper';


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
    return SQLiteHelper.executeSql('content', sqlString).then(function (results) {
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
                    type: 'shi',
                    content: JSON.parse(item.content),
                    pageid: item.pageid,
                    age: item.age
                }
            };
        }
        return date.map(function (day, i) {
            let item = itemMap[day] || null;
            if (item) {
                item.offset = every_day[i]
            };
            return item;
        })
    });
}


/*mingju列表*/
function getMingjuList(state = {}, payload) {
    var lastid = state.lastid || 0;
    var start = lastid;
    var end = lastid + 50;
    const sqlString = `select * from mingju limit ${end}`;

    return SQLiteHelper.executeSql(
        'content',
        sqlString
    ).then(results => {
        let rows = results.rows;
        let len = rows.length;
        let items = [];
        for (let i = 0; i < len; i++) {
            let item = rows.item(i);
            items.push(item);
            item.type = 'mingju';
            lastid = item.id - 1;
        }
        return {
            lastid,
            items
        };
    });
}
/*诗文列表*/

function getShiList(state = {}, payload) {
    var lastid = state.lastid || 0;
    var start = lastid;
    var end = lastid + 50;
    const sqlString = `select * from shi limit ${end}`;
    return SQLiteHelper.executeSql(
        'content',
        sqlString,
    ).then(results => {
        let rows = results.rows;
        let len = rows.length;
        let items = [];
        for (let i = 0; i < len; i++) {
            let item = rows.item(i);
            item.content = JSON.parse(item.content);
            item.type = 'shi';
            items.push(item);
            lastid = item.id - 1;
        }
        return ({
            lastid,
            items
        });
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
    { type: 'shi_list', method: getShiList },
    { type: 'mingju_list', method: getMingjuList }
]

methodList.forEach(item => injectMethod(item.type, item.method));

export default {
    fetchBySourceType
}