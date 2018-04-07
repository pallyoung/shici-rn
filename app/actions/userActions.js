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
    },
    {
        key:ACTIONS.REMOVE_FAV,
        controller:user.removeFav,
        persist:{
            fav:'fav'
        }
    },
    {
        key:ACTIONS.GET_FAV,
        controller:user.getFav
    },
    {
        key:ACTIONS.GET_COLLECTION,
        controller:user.getCollection
    },
    {
        key:ACTIONS.UPDATE_COLLECTION,
        controller:user.updateCollection
    },
    {
        key:ACTIONS.REMOVE_COLLECTION,
        controller:user.removeCollection
    }
]