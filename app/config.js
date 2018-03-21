'use strict'
import {Theme} from 'react-native-improver';
import BaseTheme from './views/themes/BaseTheme';
import {NativeManager} from './native';
import BuildConfig from './BuildConfig';
import {useProvider} from 'febrest';
import GushiProvider from './provider/GushiProvider';

useProvider('Content',GushiProvider);

//设置主题
Theme.setTheme(BaseTheme);



