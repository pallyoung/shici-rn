'use strict'
function login(userList,payload){

}

function unlogin(currentUser,payload){
    currentUser = undefined;
    return {
        currentUser
    }
}

function register(userList,payload){

}
function isLogin(currentUser){
    if(currentUser&&currentUser.name){
        return {
            loginState:{
                isLogined:true
            }
        }
    }
    return {
        loginState:{
            isLogined:false
        }
    }
}
function addFav(payload){
    var fav = [{
        user_id:payload.user_id,
        content_id:payload.content_id,
        content_type:payload.content_type,
    }];
    return {
        fav:{
            data:fav
        }
    }
}
function removeFav(payload){
    var fav = [{
        id:payload.fav_id,
        itemRemove:true
    }];
    return {
        fav:{
            data:fav
        }
    }
}

function getFav(fav){
    return {
        fav
    }
}
function getCollection(){

}
function getCollectionList(collectionList){
    return {
        collectionList
    }
}
function addCollection(){

}
function removeCollection(){

}
function updateCollection(){

}
export default {
    login,
    unlogin,
    register,
    isLogin,
    addFav,
    removeFav,
    getFav,
    getCollection,
    removeCollection,
    updateCollection,
    getCollectionList
}