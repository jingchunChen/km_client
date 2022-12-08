import {getToken, removeToken, setToken} from "@/utils/token";
import {reqUserInfo, reqLogout, reqLogin, reqModifyUserInfo, reqUploadAvatar} from "@/api";
import router from "@/router";

export default {
    namespaced: 'user',
    state: {
        token: getToken(),
        userInfo: {}
    },
    actions: {
        //获取用户信息
        async getUserInfo({commit}){
            let result = await reqUserInfo()
            if(result.code == 200){
                commit('USER_INFO', result.data.userinfo)
            }else {
                return Promise.reject(new Error(result.msg))
            }
        },
        //退出登录
        async logout({commit}){
            let result = await reqLogout()
            if(result.code == 200){
                commit('CLEAR')
                //跳转到登录页
                router.push('/login')
            }else {
                return Promise.reject(new Error(result.msg))
            }
        },
        //登录
        async login({commit}, form){
            let result = await reqLogin(form)
            if(result.code == 200){
                //存储token
                setToken(result.data.token)
                commit('LOGIN', result.data.token)
                return 'ok'
            }else{
                return Promise.reject(new Error(result.msg))
            }
        },
        //修改用戶信息（并更新）
        async edit({dispatch}, form) {
            let result = await reqModifyUserInfo(form)
            if(result.code==200){
                //更新存储数据
                dispatch('getUserInfo')
                return 'ok'
            }else {
                return Promise.reject(new Error(result.msg))
            }
        },
        //上传用户头像
        async uploadAvatar({dispatch}, param, headers){
            let result = await reqUploadAvatar(param, headers)
            if(result.code == 200){
                //重新获取用户数据
                dispatch('getUserInfo')
                return 'ok'
            }else {
                return Promise.reject(new Error(result.msg))
            }
        }
    },
    mutations: {
        LOGIN(state, token){
            state.token = token
        },
        USER_INFO(state, userinfo){
            state.userInfo = userinfo
        },
        CLEAR(state){
            state.token = ''
            state.userInfo = {}
            //清除token
            removeToken()
        }
    },
    getters: {

    }
}
