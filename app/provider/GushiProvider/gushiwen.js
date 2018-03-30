
import fetchData from './fetchData';
import shiGetter from './../../asset/shi';
import author from './../../asset/author';
import age from './../../asset/age';
import version from './../../asset/assetversion';
import mingju from './../../asset/mingju';


var shi = shiGetter.get();
const TYPES = {
    INDEX: 'index',
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
function fetchDefault(state,payload) {
    state = state || {};
    var params = state.params || {}
    params.page = params.page || 0;
    if(payload.loadMore||params.page==0){
        params.page++;
        state.params = params;
        state.data = shi.slice(0,params.page*10);
    }
    return state;
    
}
//首页名句
function fetchMingju(state={},payload){
    var params = state.params || {}
    params.page = params.page || 0;
    console.log(params,'====')
    if(payload.loadMore||params.page==0){
        params.page++;;
        state.data = mingju.slice(0,params.page*20)
    }
    return state;
}

//首页获取古籍
function fetchGuji(state={},payload){
    var params = state.params || {}
    var page = params.page || 0;
    if(payload.loadMore||params.page==0){
        params.page++;;
    }else{
        return state;
    }
    var url = `guwen/Default.aspx?p=${params.page}`;
    var data = state.data || [];
    return fetchData(url).then(function (content) {
        return parseGujiToList(content);
    }).then(function (newData) {
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