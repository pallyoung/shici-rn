import shiGetter from './../asset/shi';
import author from './../asset/author';
import age from './../asset/age';
import version from './../asset/assetversion';

import {
    AsyncStorage
} from 'react-native';


const VERSION_KEY = 'gushiwen_version';
const KEY_MAP = 'gushiwen_shi_key_map';
const SHI_KEY_PREFIX = 'gushiwen_shi_';

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
        }else{
            shiGetter.release();
        }
    }).then(function(){
        console.log('数据同步完成');
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

export default checkVersion;