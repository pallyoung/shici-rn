import ACTIONS from './../constants/ACTIONS';

export default [
    {
        name: 'userList',
        type: 'storage',
        defaultState: [
            { name: 'default' }
        ]
    },
    {
        name: 'currentUser',
        type: 'storage',
        defaultState: {
            name: 'default'
        }
    },
    {
        name: 'fav',
        type: 'storage'
    },
    {
        name: 'appMenu',
        defaultState: [
            [
                {
                    title: '往日旧诗',
                    action: ACTIONS.APP_MENU_HISTROY
                }
            ],
            [
                {
                    title: '我的收藏',
                    action: ACTIONS.APP_MENU_FAV
                },
                {
                    title: '我的诗集',
                    action:  ACTIONS.APP_MENU_COLLECTION
                }
            ],
            [
                {
                    title: '诗文集',
                    action: ACTIONS.APP_MENU_FAV
                },
                {
                    title: '名句录',
                    action:  ACTIONS.APP_MENU_COLLECTION
                }
            ]
        ]

    }
]