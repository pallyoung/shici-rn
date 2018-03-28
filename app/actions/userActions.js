import user from './../controller/user';
import ACTIONS from './../constants/ACTIONS';
export default [
    {
        key:ACTIONS.CHECK_LOGIN,
        controller:user.isLogin,
    },
    {
        key:ACTIONS.ADD_FAV,
        controller:user.addFav,
        persist:{
            fav:'fav'
        }
    }
]