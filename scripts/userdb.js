'use strict'

var SQLITE = require('sqlite3').verbose();

var fs = require('fs');
/**
 * 创建用户db
*/

/** 
 * 用户数据和内容数据分开两个数据库，方便做数据迁移
*/

const PATH = 'asset/user.db';

if (fs.existsSync(PATH)) {
    fs.unlinkSync(PATH)
}

var db = new SQLITE.Database(PATH);


const tables = [];

tables.push({
    name: 'users',
    column: [
        'id integer primary key autoincrement not null',
        'username text not null',
        'password text not null',
        'mobile text',
        'nickname text',
        'email text',
        'avatar text',
        'created_time integer',
        'updated_time integer'
    ],
    source: [
        {
            username: 'su',
            password: 'test',
        }
    ]
});

tables.push({
    name: 'fav',
    column: [
        'id integer primary key autoincrement not null',
        'user_id integer not null',
        'content_id text not null',
        'content_type text',
        'created_time integer'
    ]
});

tables.push({
    name: 'collection',
    column: [
        'id integer primary key autoincrement not null',
        'collection_name text not null',
        'cover text',
        'bookmark integer',
        'last_read_time integer',
        'read_times integer',
        'updated_time integer',
        'created_time integer'
    ]
});

tables.push({
    name: 'collection_list',
    column: [
        'id integer primary key autoincrement not null',
        'collection_id integer not null',
        'content_id text not null',
        'content_type text',
        'created_time integer'
    ]
});
function getColumn(item) {
    return item.match(/^[\S]*?(?=\s)/)[0];
}
db.serialize(function () {
    tables.forEach(function (table) {
        db.run("CREATE TABLE IF NOT EXISTS " + table.name + "(" +
            table.column.join(',') +
            ");");
        if (table.source) {
            let columns =table.column.map(function (item) {
                return getColumn(item);
            });
            let update = db.prepare("INSERT OR REPLACE  INTO " +
                table.name +
                "(" + columns.join(',') +
                ") VALUES (" +
                table.column.map(function () {
                    return '?'
                }).join(',') +
                ")"); //
            table.source.forEach(function (item, k) {
                update.run.apply(update, columns.map(function (c) {
                    return item[c];
                }));
            });
            update.finalize();
        }
    });
})

db.close(function(){

    const ANDROID_DB_PATH = 'android/app/src/main/assets/data/user.db';
    const IOS_DB_PATH = 'ios/shici/data/user.db';
    var input = fs.createReadStream(PATH);
    var output1 = fs.createWriteStream(ANDROID_DB_PATH);
    var output2 = fs.createWriteStream(IOS_DB_PATH);

    input.pipe(output1);
    input.pipe(output2);
})