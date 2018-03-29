var fetch = require('./fetch');
var path = require('path');
var fs = require('fs');

const assetPath = path.relative('./','asset');

// const file = assetPath+'/tuijie.json';
const file = assetPath+'/shiwen.json';

function innerText(string) {
    var texts = string.replace(/<[^>]*>/g,'\n').split('\n');
    var textNodes = [];
    for (let i = 0, l = texts.length; i < l; i++) {
        let text = texts[i];
        if (/^[\s▲]*$/.test(texts[i])) {
            continue;
        } else if(text.indexOf('展开阅读全文')>-1) {
            textNodes = [];
            continue;
        }else{
            textNodes.push(texts[i]);
        }
    }
    return textNodes;
}

if(!fs.existsSync(assetPath)){
    fs.mkdirSync(assetPath);
}
if(fs.existsSync(file)){
    fs.unlinkSync(file);
}
fs.appendFile(file,'[',function(){});

var page = 0;

function next(){
    return fetch(`https://m.gushiwen.org/shiwen/default_0A0A${++page}.aspx`);
}

function getShi(content){
    if (!content) {
        return null;
    } else {
        var list = content.match(/<a style="font-size:20px;line-height:24px[\s\S]*?<div class="tool">/g);
        if (list) {
            return list.map(function (item) {
                var pageid, author, age, article, title,id;
                title = item.match(/<b>([^<]*?)</)[1];
                id = item.match(/id="contson([\d]*?)"/)[1]
                let ageAuthorMatch = item.match(/">([^<]*?)<\/a/g);
                age = ageAuthorMatch[0].match(/>(.*?)[\n<]/)[1];
                author = ageAuthorMatch[1].match(/>(.*?)[\n<]/)[1];
                let articleMatch = item.match(/<div class="contson"([\s\S]*?)<div class="tool">/)[0];
                pageid = item.match(/href="\/(.*?).aspx/)[1];
                article = innerText(articleMatch);
                return {
                    pageid,
                    author,
                    id,
                    age,
                    title,
                    article
                }
            });
        }
    }
    return null;
}

function doFetch(){
    next().then(function(content){
        var result = getShi(content);
        if(!result){
            fs.appendFile(file,']',function(){});
            return;
        }else{
            fs.appendFile(file,JSON.stringify(result,null,'\t').replace(/^\[/,'').replace(/\]$/,','),function(){});
            doFetch();
        }
    })
}

doFetch();