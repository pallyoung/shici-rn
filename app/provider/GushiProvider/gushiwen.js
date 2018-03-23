
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
                let idAndArticleMatch = item.match(/<div class="contson"([\s\S]*?)<div class="tool">/)[0];
                id = idAndArticleMatch.match(/contson([\d]+)/)[1];
                article = innerText(idAndArticleMatch);
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


//获取文章
function fetchArticle(id) {
    return fetchData(`shiwen2017/ajaxshiwencont.aspx?id=${id}&value=cont`)
}
//获取注释
function fetchZhushi(id) {
    return fetchData(`shiwen2017/ajaxshiwencont.aspx?id=${id}&value=zhu`)
}
//获取翻译
function fetchYi(id) {
    return fetchData(`shiwen2017/ajaxshiwencont.aspx?id=${id}&value=yi`)
}
//获取诗文内容
function fetchContent(id) {
    //接口可能会变
    return fetchData(`shiwen2017/ajaxshiwencont.aspx?id=${id}&value=yizhushang`).
        then(function (content) {
            return parseContentToArticle(content);
        })
}


function fetchBySourceType(sourceType, state) {
    return methods[sourceType](state);
}

//
const methods = {};

function injectMethod(type, method) {
    methods[type] = method;
}

const methodList = [
    { type: 'tuijie', method: fetchDefault },
    { type: 'mingju', method: fetchMingju},
    { type: 'guji', method: fetchGuji}
]

methodList.forEach(item => injectMethod(item.type, item.method));

export default {
    fetchBySourceType
}