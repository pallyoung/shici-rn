import shiGetter from './../asset/shi';
import authorGetter from './../asset/author';
import ageGetter from './../asset/age';
import picGetter from './../asset/pic';
import mingjuGetter from './../asset/mingju';
import version from './../asset/assetversion';


const VERSION_KEY = 'gushiwen_version';
const KEY_MAP = 'gushiwen_shi_key_map';

const SHI_KEY_PREFIX = 'gushiwen_';

//100为一组数据去存储
const GROUP_COUNT = 100;

import {
    AsyncStorage
} from 'react-native';

var shi = shiGetter.get();
var keyMap = [];

var onProgress ;

function clear(){
    return AsyncStorage.getItem(KEY_MAP).then(function(v){
        if(v){
            keyMap = JSON.parse(v);
            return clearItem();
        }
        
    });
}
function clearItem(){
    var key = keyMap.shift();
    if(key){
        return AsyncStorage.removeItem(key).then(clearItem);
    }
}
function checkVersion(callback){
    console.log('开始同步数据');
    onProgress = callback;
    return AsyncStorage.getItem(VERSION_KEY).then(function(v){
        if(true||!v||v<version){
            return clear().then(update)
        }
    }).then(function(){
        console.log('数据同步完成');
        releaseAll();
        onProgress = undefined;
    });
}
function update(){
    return AsyncStorage.setItem(VERSION_KEY,String(version)).then(updateItem)
}
var keyMap  = [];

var totalLength = shi.length;
function updateItem(){
    var content = shi.shift();
    if(onProgress){
        onProgress((totalLength-shi.length)/totalLength); 
    }
    if(content){
        let innerid = content.innerid;
        let key = SHI_KEY_PREFIX+innerid;     
        keyMap.push(key);
        return AsyncStorage.setItem(key,JSON.stringify(content)).then(updateItem);
    }else{
        shiGetter.release();
        return AsyncStorage.setItem(KEY_MAP,JSON.stringify(keyMap));
    }
}


function releaseAll(params) {
    [
        shiGetter,
        picGetter,
        authorGetter,
        mingjuGetter,
        ageGetter
    ].forEach(getter => {
        getter.release();
    });
}

var updateData;
function prepareData() {
    if(!updateData){
        updateData = [];
    }
    return updateData;
}
export default {
    update:checkVersion
};