

function fetchTuijie(tuijie,fav={}){
    tuijie.data = tuijie.data.map(function(article){
        article.isFav = !!fav[article.id];
        return article;
    })
    return {
        tuijie
    }
}

function fetchMingju(mingju){
    return {
        mingju
    }
}
function fetchGuji(guji){
    return {
        guji
    }
}

function fetchArticle(article){
    return {
        article 
    }
}

export default {
    fetchTuijie,
    fetchMingju,
    fetchGuji,
    fetchArticle
}