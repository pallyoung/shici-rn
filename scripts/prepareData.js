var shi = require('./../asset/shiwen');
var mingju = require('./../asset/mingju');
var pic = require('./../asset/pic');

var sqlite = require('sqlite3').verbose();

var fs = require('fs');
var path = require('path');
const assetPath = path.relative('./','asset');
const everyFile = assetPath+'/every.json';


//起始时间
const START_DATE = new Date(2018,1,28).getTime();

//数据准备结束时间 先准备一年的数据
const END_DATE = new Date(2019,1,27).getTime();

//起始条目
const START_INDEX = 95;



var authors = new Map()
var ages = new Map();

var shis = [];

shi.forEach(function (item,index) {
    var author = item.author;
    var age = item.age;
    item.contentid = item.id;
    item.content = JSON.stringify(item.article);

    shis.push(item);

    var {
        author,
        age,
        title,
        pageid
    } = item;
    authors.set(author,{author,age});
    ages.set(age,{age});
});


var every = [];
if(fs.existsSync(everyFile)){
    every = require('./../asset/every.json');
}

const TOTAL = Math.floor((END_DATE-START_DATE)/24/3600000);

console.log('TOTAL:'+TOTAL);

if(TOTAL>every.length){

    let everyPicSet = new Set();
    let everyShiSet = new Set();
    let everyMingjuSet = new Set();
    let now = every.length;

    every.forEach(function(item){
        let {
            pic,
            mingju,
            shi
        } = item;
        everyPicSet.add(pic);
        everyMingjuSet.add(mingju);
        everyShiSet.add(shi);
    });

    let picLength = pic.length++;
    let mingjuLength = mingju.length++;
    let shiLength = shi.length++;
    for(let i = 0,left = TOTAL-now;i<left;i++){
        console.log(i,left)
        let p,m,s,date;
        date = (now+i)*24*3600000+START_DATE;
        do{
            p = pic[randomInt(picLength)];
        }while (everyPicSet.has(p));
        do{
            m = mingju[randomInt(mingjuLength)].pageid;
        }while (everyMingjuSet.has(m));

        do{
            s = shi[randomInt(shiLength)].pageid;
        }while (everyShiSet.has(s));
        every.push({
            date,
            pic:p,
            mingju:m,
            shi:s
        });
    }

}

fs.writeFileSync(everyFile,JSON.stringify(every,null,'\t'));
/***
 * 所有表数据创建完成。下面开始创建sqlite
*/

const sqlitePath = 'asset/data.db';

if (fs.existsSync(sqlitePath)) {
    fs.unlinkSync(sqlitePath);
}

var db = new sqlite.Database(sqlitePath);

const tables = [];
/**
* 开始建表
*/
/*****************表shi**************
 * 字段:
 * 1 author
 * 2 age
 * 3 pageid
 * 4 contentid
 * 5 content
 * 6 title
 */
tables.push({
    name: 'shi',
    source:shis,
    column: ['author', 'age', 'pageid', 'contentid', 'content', 'title']
});
/*****************表author**************
* 字段:
* 1 author
* 2 age
*/

tables.push({
    name: 'auhtor',
    source:authors,
    column: ['author', 'age']
});
/*****************表age**************
* 字段:
* 1 age
*/
tables.push({
    name: 'age',
    source:ages,
    column: ['age']
});

/*****************表every_day**************
* 字段:
* 1 pic
* 2 mingju
* 3 shi
*/
tables.push({
    name: 'every_day',
    source:every,
    column: ['pic', 'mingju', 'shi']
});

/*****************表mingju**************
* 字段:
* 1 pageid
* 2 text
*/
tables.push({
    name: 'mingju',
    source:mingju,
    column: ['pageid', 'text']
});
db.serialize(function () {
    tables.forEach(function (table) {
        db.run("CREATE TABLE IF NOT EXISTS  " + table.name + "  (" +
            "id  integer PRIMARY KEY autoincrement," +     //字段
            table.column.reduce(function (pre, item) {
                return pre + ',' + item + ' text';
            }) +
            ") ");
        var update = db.prepare("INSERT OR REPLACE  INTO " +
            table.name +
            "(" + table.column.join(',') +
            ") VALUES (" +
            table.column.map(function() {
                return '?'
            }).join(',')+
            ")"); //
        table.source.forEach(function (item,k) {
            update.run.apply(update,table.column.map(function(c){
                return item[c];
            }));
        });
        update.finalize();
    })
})
function randomInt(upper) {
    return Math.floor(Math.random(Date.now()) * upper);
}

db.close();