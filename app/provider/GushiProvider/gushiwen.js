
import fetchData from './fetchData';


const TYPES = {
    INDEX: 'index',
}

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

//将原始html转成包含id的list
function parseShiToList(content) {
    if (!content) {
        return null;
    } else {
        var list = content.match(/<a style="font-size:20px;line-height:24px[\s\S]*?<div class="tool">/g);
        if (list) {
            return list.map(function (item) {
                var id, author, age, article, title;
                title = item.match(/<b>([^<]*?)</)[1];
                let ageAuthorMatch = item.match(/">([^<]*?)<\/a/g);
                age = ageAuthorMatch[0].match(/>(.*?)</)[1];
                author = ageAuthorMatch[1].match(/>(.*?)</)[1];
                let articleMatch = item.match(/<div class="contson"([\s\S]*?)<div class="tool">/)[0];
                id = item.match(/href="\/(.*?).aspx/)[1];
                article = innerText(articleMatch);
                return {
                    id,
                    author,
                    age,
                    title,
                    article
                }
            });
        }
    }
}

//解析名句
function parseMingjuToList(content){
    if (!content) {
        return null;
    } else {
        var list = content.match(/<div class="cont" style=" margin-top:12px;border-bottom:1px dashed #DAD9D1; padding-bottom:7px;">[\s\S]*?<\/div>/g);
        if (list) {
            return list.map(function (item) {
                var id, text;
                id = item.match(/mingju\/(.*?)\.aspx/)[1];
                text = item.match(/>(.*?)</)[1];
                return {
                    id,
                    text
                }
            });
        }
    }
}

//解析古籍
function parseGujiToList(content){
    if (!content) {
        return null;
    } else {
        var list = content.match(/<div class="cont">[\s\S]*?<div class="tool">/g);
        if (list) {
            return list.map(function (item) {
                var id, brief,title;
                id = item.match(/guwen\/(.*?)\.aspx/)[1];
                title =item.match(/<b>(.*?)<\/b>/)[1]
                brief = item.match(/<p style=" margin:0px;">(.*?)</)[1];
                return {
                    id,
                    title,
                    brief
                }
            });
        }
    }
}

//解析诗文内容
function parseArticle(content){
    if (!content) {
        return null;
    } else {
        var main = content.match(/<div class="main3"[\s\S]*?<\/div>(?=\n<script)/)[0];
        var title = main.match(/<h1 style="font-size:22px; line-height:30px; margin-bottom:10px;">(.*?)<\/h1>/)[1];
        var age = main.match(/<a href="\/shiwen[^>]*?>(.*?)<\/a>/)[1];
        var author = main.match(/<a href="\/authorv[^>]*?>(.*?)<\/a>/)[1];
        var article =  innerText(main.match(/<div class="contson"[^>]*?>([\s\S]*?)<\/div>/)[1]);
        return {
                title,
                article,
                author,
                age
            }
    }
}
//首页推荐
function fetchDefault(state) {
    state = state || {};
    var params = state.params || {}
    var page = params.page || 1;
    var url = `default_${page}.aspx`;
    var data = state.data || [];
    return fetchData(url).then(function (content) {
        return parseShiToList(content);
    }).then(function (newData) {
        params.page = page + 1;
        data = data.concat(newData);
        return {
            params,
            data
        }
    });
}
//首页名句
function fetchMingju(state={}){
    var params = state.params || {}
    var page = params.page || 1;
    var url = `mingju/Default.aspx?p=${page}`;
    var data = state.data || [];
    return fetchData(url).then(function (content) {
        return parseMingjuToList(content);
    }).then(function (newData) {
        params.page = page + 1;
        data = data.concat(newData);
        return {
            params,
            data
        }
    });
}

//首页获取古籍
function fetchGuji(state={}){
    var params = state.params || {}
    var page = params.page || 1;
    var url = `guwen/Default.aspx?p=${page}`;
    var data = state.data || [];
    return fetchData(url).then(function (content) {
        return parseGujiToList(content);
    }).then(function (newData) {
        params.page = page + 1;
        data = data.concat(newData);
        return {
            params,
            data
        }
    });
}



function fetchBySourceType(sourceType, state,payload) {
    return methods[sourceType](state,payload);
}
function fetchArticle(state,payload){
    var url = `${payload.id}.aspx`;
    return fetchData(url).then(function (content) {
        return parseArticle(content);
    });
}
//
const methods = {};

function injectMethod(type, method) {
    methods[type] = method;
}

const methodList = [
    { type: 'tuijie', method: fetchDefault },
    { type: 'mingju', method: fetchMingju},
    { type: 'guji', method: fetchGuji},
    { type: 'article', method: fetchArticle},
]

methodList.forEach(item => injectMethod(item.type, item.method));

export default {
    fetchBySourceType
}