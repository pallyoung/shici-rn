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
    }
]