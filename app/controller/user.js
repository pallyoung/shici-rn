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

export default {
    login,
    unlogin,
    register,
    isLogin
}