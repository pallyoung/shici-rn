

function getEvery(every_day_list) {
    return {
        every_day_list
    }
}


function getMingjuList(mingjuList,$persist) {
    $persist('mingjuList',mingjuList);
    return {
        mingjuList
    }
}

function getShiList(shiList,fav, $persist) {
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
    $persist('shiList',shiList);
    return {
        shiList
    }
}
export default {
    getEvery,
    getMingjuList,
    getShiList
}