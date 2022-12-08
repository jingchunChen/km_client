import fa from "element-ui/src/locale/lang/fa";

export default [
    {
        path: '/',
        redirect: '/login'
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('@/views/Home'),
        meta : {
            footerShow: false,
            headerShow: true,
            revertShow: false
        }
    },
    {
        name: 'mindmap',
        path: '/mindmap',
        component: () => import('@/views/MindMap'),
        meta : {
            footerShow: false,
            headerShow: true,
            revertShow: false
        },
    },
    {
        name: 'book',
        path: '/book',
        component: ()=> import('@/views/Book'),
        meta: {
            footerShow: false,
            headerShow: false,
            revertShow: false
        }
    },
    {
        name: 'timetree',
        path: '/timetree',
        component: () => import('@/views/TimeTree'),
        meta : {
            footerShow: false,
            headerShow: true,
            revertShow: false
        }
    },
    {
        name: 'community',
        path: '/community',
        component: () => import('@/views/Community'),
        meta : {
            footerShow: true,
            headerShow: true,
            revertShow: false
        }
    },
    {
        name: 'createpost',
        path: '/createpost',
        component: () => import('@/views/CreatePost'),
        meta: {
            footerShow: false,
            headerShow: false,
            revertShow: true
        }
    },
    {
        name: 'detailpost',
        path: '/detailpost/:id',
        component:  () => import('@/views/DetailPost'),
        meta: {
            footerShow: false,
            headerShow: false,
            revertShow: true
        }
    },
    {
        name: 'editpost',
        path: '/editpost/:id',
        component: () => import('@/views/EditPost'),
        meta: {
            footerShow: false,
            headerShow: false,
            revertShow: true
        }
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/Login'),
        meta : {
            footerShow: false,
            headerShow: false,
            revertShow: false
        }
    },
    {
        name: 'register',
        path: '/register',
        component: ()=> import('@/views/Register/index'),
        meta : {
            footerShow: false,
            headerShow: false,
            revertShow: false
        }
    },
    {
        name: 'user',
        path: '/user',
        redirect: '/user/userinfo',
        component: () => import('@/views/User'),
        children: [
            {
                path: 'userinfo',
                component: ()=> import('@/views/User/information'),
                meta : {
                    footerShow: false,
                    headerShow: true,
                    revertShow: false
                },
            },
            {
                path: 'password',
                component: ()=> import('@/views/User/password'),
                meta : {
                    footerShow: false,
                    headerShow: true,
                    revertShow: false
                },
            }
        ]
    }
]
