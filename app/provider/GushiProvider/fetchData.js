const host = 'http://m.gushiwen.org/';

var headers = new Headers();
function fetchData(url) {
    url = host + url;
    return fetch(
        url,
        {
            method: 'get',
        }).then(function (response) {
            return response.text().then(function (content) {
                return content;
            });
        }, function (err) {
            console.log(err, '=====')
        });
}

export default fetchData;