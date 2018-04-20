
import { autoSize, px2dp } from 'react-native-improver';
import { Dimensions,Platform,PixelRatio } from 'react-native';

const windows = Dimensions.get('window');

let px = 1/PixelRatio.get();
var BaseTheme = {
    f1: autoSize(10),
    f2: autoSize(12),
    f3: autoSize(14),
    f4: autoSize(16),
    f5: autoSize(18),
    f6: autoSize(20),

    screenWidth:windows.width,
    screenHeight:windows.height,
    
    paddingHorizontal:autoSize(14),
    mainColor:'#fff',
    px:px,
    
    color:'#333',
    
    borderColor:'rgba(120,120,120,0.5)',

    header:{
        height:64,
        paddingTop:20,
        backgroundColor:'#fff',
        borderBottomWidth:px2dp(1),
        borderColor:'rgba(120,120,120,0.5)',
        flexDirection:'row'
    },
    headerTitle:{
        
    }
}

export default BaseTheme;