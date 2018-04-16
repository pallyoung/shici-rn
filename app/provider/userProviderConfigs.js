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
        name: 'collectionList',
        type: 'user',
        sourceType:'collectionList'
    },
    {
        name: 'appMenu',
        defaultState: [
            [
                {
                    title: '往日旧诗',
                    action: ACTIONS.APP_MENU_HISTROY,
                    icon:'ios-film-outline'
                }
            ],
            [
                {
                    title: '我的收藏',
                    action: ACTIONS.APP_MENU_FAV,
                    icon:'ios-archive-outline'
                },
                {
                    title: '我的诗集',
                    action:  ACTIONS.APP_MENU_COLLECTION,
                    icon:'ios-albums-outline'
                }
            ],
            [
                {
                    title: '诗文集',
                    action: ACTIONS.APP_SHI,
                    icon:'ios-book-outline'
                },
                {
                    title: '名句录',
                    action:  ACTIONS.APP_MINGJU,
                    icon:'ios-bookmarks-outline'
                }
            ]
        ]

    }
]