var http = require('https');
var URL = require('url')

function fetch(url){

    return new Promise(function(res,rej){
        let client = http.request(URL.parse(url), function (comingMessaage) {
            console.log(url,comingMessaage.statusCode)
            if(comingMessaage.statusCode=='200'){
                let data = new Buffer(0);
                comingMessaage.on('data',function(chunk){
                    data = Buffer.concat([data,chunk]);
                });
                comingMessaage.on('end',function(chunk){
                    res(data.toString('utf8'));
                });
            }else{
                rej(comingMessaage.statusCode);
            }
        });
        client.end();
    });
}

module.exports = fetch;