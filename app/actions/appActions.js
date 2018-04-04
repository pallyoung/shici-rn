import app from './../controller/app';
import content from './../controller/content';
import ACTIONS from './../constants/ACTIONS';
export default [
    {
        key:ACTIONS.INIT,
        controller:app.appInit,
    },
    {
        key:ACTIONS.MAIN_PAGE,
        controller:content.getEvery,
    },
    {
        key:ACTIONS.APP_MENU,
        controller:app.getMenu
    }
]