var shi = require('./../asset/shiwen');
var mingju = require('./../asset/mingju');

var fs  = require('fs');
/**数据会重复 要做下处理 */
var shiMap = new Map()
var mingjuMap = new Map();

shi.forEach(item => {
    shiMap.set(item.pageid,item);
});

mingju.forEach(item => {
    mingjuMap.set(item.pageid,item);
});

shi = [];
mingju = [];

shiMap.forEach(function(item) {
    shi.push(item);
});

mingjuMap.forEach(function(item) {
    mingju.push(item);
});
fs.writeFileSync('asset/shiwen.json',JSON.stringify(shi,null,'\t'));
fs.writeFileSync('asset/mingju.json',JSON.stringify(mingju,null,'\t'));