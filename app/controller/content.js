

function getEvery(every_day_list) {
    return {
        every_day_list
    }
}


function getMingjuList(mingjuList) {
    return {
        mingjuList
    }
}

function getShiList(shiList,fav) {
    var favMap = {};
    fav.shi.forEach((item)=>{
        favMap[item.content_id] = item;
    });
    shiList.items = shiList.items.map(function(item){
        if(!item){
            return null;
        }
        var favI = favMap[item.pageid];
        if(favI){
            item.isFav = true;
            item.fav_id = favI.id;
        }
        return item;
    })
    return {
        shiList
    }
}
export default {
    getEvery,
    getMingjuList,
    getShiList
}