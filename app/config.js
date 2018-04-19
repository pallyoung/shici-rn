'use strict'
import {Theme} from 'react-native-improver';
import BaseTheme from './views/themes/BaseTheme';
import {NativeManager} from './native';
import BuildConfig from './BuildConfig';
import {
        useProvider,
        injectProvider,
        createActions,
        setStorageProviderTool        
    } from 'febrest';
import GushiProvider from './provider/GushiProvider';
import UserProvider from './provider/UserProvider';
import {
    AsyncStorage
} from 'react-native';

import contentProviderConfigs from './provider/contentProviderConfigs';
import userProviderConfigs from './provider/userProviderConfigs';
import userActions from './actions/userActions';
import appActions from './actions/appActions';

useProvider('content',GushiProvider);
useProvider('user',UserProvider);
injectProvider(contentProviderConfigs);
injectProvider(userProviderConfigs);
createActions(userActions);
createActions(appActions);

const SHICI_STROAGE_PRE = 'SHICI_STROAGE_PRE_';

setStorageProviderTool({
    setter:function(key,value){
        key = SHICI_STROAGE_PRE+key;
        try{
            value = JSON.stringify(value);
        }catch(e){

        }
        return AsyncStorage.setItem(key,value);
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



