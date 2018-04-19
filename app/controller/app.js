'use strict'
function appInit() {
    return {
        inited: true
    }
}

function getMenu(appMenu) {
    return {
        appMenu
    }
}

function empty() {
    return {
        message: 'ok'
    }
}
function transmit($payload){
    let payload = $payload();

    return payload;
}

function isSameMonth(time1, time2) {
    return new Date(time1).getMonth() === new Date(time2).getMonth();
}
function getHistory(every_day_list,$payload) {

    var history = [];
    var preItem = every_day_list.shift();
    var temp = {
        data: [],
        title: preItem.date
    }
    var tempArray = [preItem];
    let payload = $payload();

    every_day_list.forEach(function (item, index) {
        if(item===null){
            return;
        }
        if (!isSameMonth(preItem.date, item.date)) {
            temp.data.push(tempArray);
            history.push(temp);
            temp = {
                data: [],
                title: item.date
            };
            tempArray = [];
        } else {
            if (tempArray.length < 2) {
                tempArray.push(item);
            } else {
                temp.data.push(tempArray);
                tempArray = [item];
            }
        }
        preItem = item;
    });
    if(tempArray.length!==0){
        temp.data.push(tempArray);
        history.push(temp);
    }   
    return {
        history
    }
}

function gotoDate($payload) {
    let payload = $payload();

    return payload;
}
export default {
    appInit,
    getMenu,
    empty,
    getHistory,
    gotoDate,
    transmit
}