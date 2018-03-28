//获取数据基础方法
import {Provider} from 'febrest';
import gushiwen from './gushiwen';

var fetchBySourceType = gushiwen.fetchBySourceType;
class GushiProvider extends Provider{
    params:any;
    sourceType:string;
    constructor(config){
        super(config);
        this.state = config.state||{};
        this.sourceType = config.sourceType;
    }
    set(state){
        this.state=state;
    }
    get(payload={}){
        return fetchBySourceType(this.sourceType,this.state,payload);
    }
}


export default GushiProvider;
