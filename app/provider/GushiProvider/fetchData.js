const host = 'http://m.gushiwen.org/';

function fetchData(url){
    return fetch(host+url).then(function(response){
        return response.body().then(function(content){
            return content;
        });
    });
}

export default fetchData;