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
    },

    {
        key:ACTIONS.APP_EXIT,
        controller:app.empty
    },
    {
        key:ACTIONS.APP_MENU_COLLECTION,
        controller:app.empty
    },
    {
        key:ACTIONS.APP_MENU_HISTROY,
        controller:app.empty
    },
    {
        key:ACTIONS.APP_MENU_FAV,
        controller:app.empty
    },
    {
        key:ACTIONS.APP_SETTING,
        controller:app.empty
    },
    {
        key:ACTIONS.APP_SEARCH,
        controller:app.empty
    },
    {
        key:ACTIONS.GET_HISTORY,
        controller:app.getHistory
    },
    {
        key:ACTIONS.APP_GOTO_DATE,
        controller:app.gotoDate
    },
    {
        key:ACTIONS.APP_MINGJU,
        controller:app.empty
    },
    {
        key:ACTIONS.APP_SHI,
        controller:app.empty
    },
    {
        key:ACTIONS.SHI_ITEM_MENU,
        controller:app.transmit
    },
    {
        key:ACTIONS.NAVIGATE_TO_SHI,
        controller:app.transmit
    },


    {
        key:ACTIONS.GET_MINGJU_LIST,
        controller:content.getMingjuList
    },

    {
        key:ACTIONS.GET_SHI_LIST,
        controller:content.getShiList
    }
]