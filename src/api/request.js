import axios from "axios";
// import nprogress from 'nprogress'
// import 'nprogress/nprogress.css'
import store from '@/store'
import {removeToken} from '@/utils/token'
import router from "@/router";

//利用axios对象的方法create，去创建一个axios实例
//request就是axios,只不过配置了一下
const request = axios.create({
    //基础路径，发送请求时路径前面会自动添加'/api'
    baseURL: '/api',
    //代表请求超时的时间5s
    timeout: 5000
})

//请求拦截器：在发送请求之前，请求拦截器可以检测到，在请求发出之前做一些事情
request.interceptors.request.use((config)=>{
        // config.headers['Content-Type'] ='application/json;charset=UTF-8'
        //开启进度条
        // nprogress.start()
        //获取临时id并写入请求头
        /*if(store.state.detail.uuid_token){//存在游客id
            config.headers.userTempId = store.state.detail.uuid_token
        }*/
        //获取token并写入请求头
        // console.log(store.state.user.token)
        if(store.state.user.token){
            config.headers.token = store.state.user.token
        }
        //config:配置对象，对象里面有一个属性很重要，headers请求头
        return config;
    }
    )

//响应拦截器
request.interceptors.response.use((response)=>{
    //结束进度条
    // nprogress.done()
    // console.log(response)
    let res = response.data;
    // 如果是返回的文件
    if (response.config.responseType === 'blob') {
        return res
    }
    // 兼容服务端返回的字符串数据
    if (typeof res === 'string') {
        res = res ? JSON.parse(res) : res
    }
    //获取错误状态码，token失效
    if (response.data.code == 401) {
        console.log('token过期！')
        // 清除token,去除请求头
        removeToken()
        router.push('/login')
        // delete headers.common.token;
    }
    return res;
},(error)=>{
    console.log(error.message)
    return Promise.reject(new Error(error.message))
});
export default request;
