
import fetchData from './fetchData';


const TYPES = {
    INDEX: 'index',
}


//将原始html转成包含id的list
function parseShiToList(content) {
    if (!content) {
        return null;
    } else {
        var list = content.match(/<a style="font-size:20px;line-height:24px[\s\S]*?<div class="tool">/g);
        if (list) {
            return list.map(function (item) {
                var id,author,age,article,title;
                title = item.match(/<b>([^<]*?)</)[1];
                let ageAuthorMatch = item.match(/">([^<]*?)<\/a/g);
                age = ageAuthorMatch[0].match(/>(.*?)</)[1];
                author = ageAuthorMatch[1].match(/>(.*?)</)[1];
                let idAndArticleMatch = item.match(/<div class="contson"([\s\S]*?)<\/div>/)[1];
                id = idAndArticleMatch.match(/contson([\d]+)/)[1];
                article = idAndArticleMatch.match(/\n([\s\S]*?)\n/)[1].split(/<.+>/)
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



function fetchDefault(params) {
    params = params||{}
    let page = params.page||1;
    var url = `default_${page}.aspx`;
    return fetchData(url).then(function (content) {
        return parseShiToList(content);
    }).then(function(data){
        params.page=page+1;
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


function fetchBySourceType(sourceType, params) {
    return methods[sourceType](params);
}

//
const methods = {};

function injectMethod(type, method) {
    methods[type] = method;
}

const methodList = [
    {type:'tuijie',method:fetchDefault}
]

methodList.forEach(item=>injectMethod(item.type,item.method));
export default {
    fetchBySourceType
}