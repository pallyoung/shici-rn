'use strict'
function appInit(){
    return {
        inited:true
    }
}

function getMenu(appMenu){
    return {
        appMenu
    }
}

function empty(){
    return {
        message:'ok'
    }
}

export default {
    appInit,
    getMenu,
    empty
}