import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        // { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        // { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/conf',
        icon: 'settings',
        name: 'conf',
        title: '设置',
        component: Main,
        children: [
            { path: 'index', title: '设置', name: 'conf_index', component: () => import('@/views/admin/conf.vue') }
        ]
    },
    {
        path: '/wxtx',
        icon: 'paper-airplane',
        name: 'wxtx',
        title: '提醒',
        component: Main,
        children: [
            { path: 'index', title: '提醒', name: 'wxtx_index', component: () => import('@/views/admin/wxtx.vue') }
        ]
    },
    {
        path: '/wxcx',
        icon: 'social-chrome-outline',
        name: 'wxcx',
        title: '查询',
        component: Main,
        children: [
            { path: 'index', title: '查询', name: 'wxcx_index', component: () => import('@/views/admin/wxcx.vue') }
        ]
    },
    {
        path: '/sms',
        icon: 'chatbox',
        name: 'sms',
        title: '短信',
        component: Main,
        children: [
            { path: 'index', title: '短信', name: 'sms_index', component: () => import('@/views/admin/sms.vue') }
        ]
    },
    {
        path: '/email',
        icon: 'email',
        name: 'email',
        title: 'Email',
        component: Main,
        children: [
            { path: 'index', title: 'Email', name: 'email_index', component: () => import('@/views/admin/email.vue') }
        ]
    },
    {
        path: '/wxtxl',
        icon: 'ios-people',
        name: 'wxtxl',
        title: '微信用户',
        component: Main,
        children: [
            { path: 'index', title: '微信用户', name: 'wxtxl_index', component: () => import('@/views/admin/wxtxl.vue') }
        ]
    },
    {
        path: '/localtxl',
        icon: 'ios-people',
        name: 'localtxl',
        title: '本地用户',
        component: Main,
        children: [
            { path: 'index', title: '本地用户', name: 'localtxl_index', component: () => import('@/views/admin/localtxl.vue') }
        ]
    },
    {
        path: '/wxtk',
        icon: 'image',
        name: 'wxtk',
        title: '多媒体库',
        component: Main,
        children: [
            { path: 'index', title: '多媒体库', name: 'wxtk_index', component: () => import('@/views/admin/wxtk.vue') }
        ]
    },
    {
        path: '/syslog',
        icon: 'stats-bars',
        name: 'syslog',
        title: '日志',
        component: Main,
        children: [
            { path: 'index', title: '日志', name: 'syslog_index', component: () => import('@/views/admin/syslog.vue') }
        ]
    }
//    {
//        path: '/es2ju',
//        icon: 'settings',
//        name: 'es2ju',
//        title: 'ES2JU转存工具',
//        component: Main,
//        children: [
//            { path: 'index', title: 'ES2JU转存工具', name: 'es2ju_index', component: () => import('@/views/admin/es2ju.vue') }
//        ]
//    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
