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
function addFav(fav={},payload){
    fav[payload.id] = true;
    return {
        fav
    }
}
function removeFav(fav={},payload){
    delete fav[payload.id];
    return {
        fav
    }
}
export default {
    login,
    unlogin,
    register,
    isLogin,
    addFav,
    removeFav
}