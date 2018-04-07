import ACTIONS from './../constants/ACTIONS';

export default [
    {
        name: 'userList',
        type: 'user',
        defaultState: [
            { name: 'default' }
        ]
    },
    {
        name: 'currentUser',
        type: 'user',
        defaultState: {
            name: 'default'
        }
    },
    {
        name: 'fav',
        type: 'user',
        sourceType:'fav'
    },
    {
        name: 'collection',
        type: 'user',
        sourceType:'collection'
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
                    action: ACTIONS.APP_SHI
                },
                {
                    title: '名句录',
                    action:  ACTIONS.APP_MINGJU
                }
            ]
        ]

    }
]