//获取数据基础方法
const host = 'http://m.gushiwen.org/';
import {Provider} from 'febrest';
import gushiwen from './gushiwen';

var fetchBySourceType = gushiwen.fetchBySourceType;
class GushiProvider extends Provider{
    params:any;
    sourceType:string;
    constructor(config){
        super(config);
        this.params = config.params;
        this.sourceType = config.sourceType;
    }
    set(params){
        this.params=params;
    }
    get(){
        return fetchBySourceType(this.sourceType,this.params);
    }
}


export default GushiProvider;
