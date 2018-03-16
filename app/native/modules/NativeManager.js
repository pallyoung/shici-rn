var {
    NativeModules
} = require('react-native');
module.exports = NativeModules.NativeManager||{
    ENV:'DEV',
    hideLoadingView:function(){

    },
    showLoadingView:function(){
        
    }
}