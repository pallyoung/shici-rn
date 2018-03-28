import user from './../controller/user';
import ACTIONS from './../constants/ACTIONS';
export default [
    {
        key:ACTIONS.CHECK_LOGIN,
        controller:user.isLogin,
    }
]