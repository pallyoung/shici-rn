'use strict'
import { Platform } from 'react-native';
import {NativeManager} from './../native';

import YW from './YW';
import FT from './FT';
import PROD from './PROD';
import DEBUG from './DEBUG';
var ENV = NativeManager.ENV.toUpperCase();
var config = {};
switch(ENV){
    case 'YW':
        config = YW;
        break;
    case 'FT':
        config = FT;
        break;
    case 'PROD':
        config = PROD;
        break;
    case 'DEBUG':
        config = DEBUG;
        break;

}
var BuildConfig = {
    NANE:'',
    ENV,
    VERSION:'',
    PLATFORM: Platform.OS.toUpperCase(),
    ...config,
}
export default BuildConfig;