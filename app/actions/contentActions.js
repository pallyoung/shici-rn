import content from './../controller/content';
import ACTIONS from './../constants/ACTIONS';
export default [
    {
        key:ACTIONS.FETCH_DEFAULT,
        controller:content.fetchTuijie,
        persist:{
            tuijie:'tuijie'
        }
    },
    {
        key:ACTIONS.FETCH_MINGJU,
        controller:content.fetchMingju,
        persist:{
            mingju:'mingju'
        }
    },
    {
        key:ACTIONS.FETCH_GUJI,
        controller:content.fetchGuji,
        persist:{
            guji:'guji'
        }
    },
    {
        key:ACTIONS.FETCH_ARTICLE,
        controller:content.fetchArticle,
    }
]