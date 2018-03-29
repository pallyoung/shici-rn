var fetch = require('./fetch');
var path = require('path');
var fs = require('fs');

const assetPath = path.relative('./', 'asset');

const file = assetPath + '/mingju.json';


if (!fs.existsSync(assetPath)) {
    fs.mkdirSync(assetPath);
}
if (fs.existsSync(file)) {
    fs.unlinkSync(file);
}
fs.appendFile(file, '[', function () { });

var page = 0;

function next() {
    return fetch(`https://m.gushiwen.org/mingju/Default.aspx?p=${++page}`);
}

function getMingju(content) {
    if (!content) {
        return null;
    } else {
        var list = content.match(/<div class="cont" style=" margin-top:12px;border-bottom:1px dashed #DAD9D1; padding-bottom:7px;">[\s\S]*?<\/div>/g);
        if (list) {
            return list.map(function (item) {
                var pageid, text;
                pageid = item.match(/mingju\/(.*?)\.aspx/)[1];
                text = item.match(/>(.*?)</)[1];
                return {
                    pageid,
                    text
                }
            });
        }
    }
    return null;
}

function doFetch() {
    next().then(function (content) {
        var result = getMingju(content);
        if (!result) {
            fs.appendFile(file, ']', function () { });
            return;
        } else {
            fs.appendFile(file, JSON.stringify(result, null, '\t').replace(/^\[/, '').replace(/\]$/, ','), function () { });
            doFetch();
        }
    })
}

doFetch();