
function fetchData(url){
    return fetch(url).then(function(response){
        return response.body().then(function(content){
            return content;
        });
    });
}

export default fetchData;