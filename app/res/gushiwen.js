
const host = 'http://m.gushiwen.org/';

const TYPES = {
    INDEX:'index',
}
//获取数据基础方法
function fetchData(url){
    url = host+url;
    return fetch(url).then(function(response){
        return response.body().then(function(content){
            return content;
        });
    });
}

//将原始html转成包含id的list
function parseContentToList(content){
    if(!content){
        return null;
    }else {
       var list = content.match(/OnYiwen\(([\d]+)\)/g) ;
       if(list){
           return list.map(function(item){
               return item.match(/[\d]+/);
           });
       }
    }
}




function fetchListByType(){

}

//获取文章
function fetchArticle(id){
    return fetchData(`shiwen2017/ajaxshiwencont.aspx?id=${id}&value=cont`)
}
//获取注释
function fetchZhushi(id){
    return fetchData(`shiwen2017/ajaxshiwencont.aspx?id=${id}&value=zhu`)
}
//获取翻译
function fetchYi(id){
    return fetchData(`shiwen2017/ajaxshiwencont.aspx?id=${id}&value=yi`)
}
//获取诗文内容
function fetchContent(id){
    //接口可能会变
    return fetchData(`shiwen2017/ajaxshiwencont.aspx?id=${id}&value=yizhushang`).
    then(function(content){
        return parseContentToArticle(content);
    })
}

export default {
    fetchContent
}