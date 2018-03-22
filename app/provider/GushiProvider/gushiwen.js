
import fetchData from './fetchData';


const TYPES = {
    INDEX: 'index',
}


//将原始html转成包含id的list
function parseShiToList(content) {
    if (!content) {
        return null;
    } else {
        return content;
        // var list = content.match(/<div class="yizhu">(([\d]+)\)/g);
        // if (list) {
        //     return list.map(function (item) {
        //         return item.match(/[\d]+/);
        //     });
        // }
    }
}



function fetchDefault(params) {

    var url = `default_${params.page}.aspx`;
    return fetchData(url).then(function (content) {
        console.log(content)
        return parseShiToList(content);
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