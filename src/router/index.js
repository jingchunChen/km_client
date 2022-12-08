import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
import store from "@/store";
Vue.use(VueRouter)

//路由注册
let router = new VueRouter({
    routes,
    //设置路由跳转后始终滚回顶部
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})
//配置全局前置路由守卫
router.beforeEach(async (to, from, next)=>{
    //判断用户是否已登录
    if(store.state.user.token){//已登录
        if(to.path == '/login' || to.path == '/register'){//已登录，不用跳转到登录页和注册页
            //直接跳转首到页
            next('/home')
        }else {//已登录跳转到其他页面，获取用户信息后在跳转
            try {
                await store.dispatch('user/getUserInfo')
                next();
            }catch (e) {
                //获取不到用户信息，token过期，用户重新登录
                store.dispatch('user/logout')
                next('/login')
            }
        }
    }else {//未登录，强制用户注册登录
        if(to.path == '/login' || to.path == '/register'){
            next()
        }else {
            next('/login')
        }
    }
})
export default router
