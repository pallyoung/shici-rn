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


export default {
    login,
    unlogin,
    register
}