import app from './../controller/app';
import ACTIONS from './../constants/ACTIONS';
export default [
    {
        key:ACTIONS.INIT,
        controller:app.appInit,
    },
]