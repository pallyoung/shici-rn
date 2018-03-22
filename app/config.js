'use strict'
import {Theme} from 'react-native-improver';
import BaseTheme from './views/themes/BaseTheme';
import {NativeManager} from './native';
import BuildConfig from './BuildConfig';
import {
        useProvider,
        injectProvider,
        createActions
    } from 'febrest';
import GushiProvider from './provider/GushiProvider';

import contentProviderConfigs from './provider/contentProviderConfigs';
import contentActions from './actions/contentActions';

useProvider('content',GushiProvider);
injectProvider(contentProviderConfigs);
createActions(contentActions)


//设置主题
Theme.setTheme(BaseTheme);



