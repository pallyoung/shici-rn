import SQLite from 'react-native-sqlite-storage';

let user, content;
function ready() {
    if (user) {
        return Promise.resolve();
    }
    return new Promise(function (resolve, reject) {
        content = SQLite.openDatabase(
            { name: "content", createFromLocation: "~data/data.db" },
            function () {
                user = SQLite.openDatabase(
                    { name: "user", createFromLocation: "~data/user.db" },
                    function () {
                        user.attach('content', 'content', function () {
                            resolve();
                        })
                    }
                )
            }
        )
    })

}

function executeSql(type, sql, data = []) {
    return ready().then(() => new Promise((resolve, reject) => {
        let db = user;
        if (type === 'content') {
            db = content;
        }
        db.transaction(tx => {
            tx.executeSql(
                sql,
                data,
                (tx, results) => {
                    resolve(results)
                }
            )
        });
    }))
}




export default {
    executeSql
}
