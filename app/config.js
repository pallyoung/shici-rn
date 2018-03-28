'use strict'
import {Theme} from 'react-native-improver';
import BaseTheme from './views/themes/BaseTheme';
import {NativeManager} from './native';
import BuildConfig from './BuildConfig';
import {
        useProvider,
        injectProvider,
        createActions,
        StorageProvider,
    } from 'febrest';
import GushiProvider from './provider/GushiProvider';
import {
    AsyncStorage
} from 'react-native';

import contentProviderConfigs from './provider/contentProviderConfigs';
import userProviderConfigs from './provider/userProviderConfigs';
import contentActions from './actions/contentActions';
import userActions from './actions/userActions';

useProvider('content',GushiProvider);
injectProvider(contentProviderConfigs);
injectProvider(userProviderConfigs);
createActions(contentActions);
createActions(userActions);

const SHICI_STROAGE_PRE = 'SHICI_STROAGE_PRE_';
StorageProvider.setStorageTool({
    setter:function(key,value){
        key = SHICI_STROAGE_PRE+key;
        try{
            value = JSON.stringify(value);
        }catch(e){

        }
        return AsyncStorage.setItem(key,);
    },
    getter:function(key){
        key = SHICI_STROAGE_PRE+key;
        return AsyncStorage.getItem(key).then(function(value){
            try{
                value = JSON.parse(value);
            }catch(e){
                
            }
            return value;
        });
    }
})

//设置主题
Theme.setTheme(BaseTheme);



