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

function isSameMonth(time1, time2) {
    return new Date(time1).getMonth() === new Date(time2).getMonth();
}
function getHistory(every_day_list) {

    var history = [];
    var preItem = every_day_list.shift();
    var temp = {
        data:[preItem],
        title:preItem.date
    }

    every_day_list.forEach(function(item){
        if(!isSameMonth(preItem.date,item.date)){
            history.push(temp);
            temp = {
                data:[item],
                title:item.date
            };
        }else{
            temp.data.push(item);
        }
        preItem = item;
    });
    history.push(temp);
    console.log(history)
    return {
        history
    }
}
export default {
    appInit,
    getMenu,
    empty,
    getHistory
}