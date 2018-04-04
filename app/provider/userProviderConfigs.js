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
                    action: ''
                }
            ],
            [
                {
                    title: '我的收藏',
                    action: ''
                },
                {
                    title: '我的诗集',
                    action: ''
                }
            ]
        ]

    }
]