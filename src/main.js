import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import MyButton from "@/components/MyButton";
import MyInput from "@/components/MyInput/index"
import MyCard from "@/components/MyCard"
//注册全局组件
Vue.component(MyButton.name, MyButton)
Vue.component(MyInput.name, MyInput)
Vue.component(MyCard.name, MyCard)

//API接口统一管理
import * as API from '@/api'

//引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  //注册路由
  router,
  //注册仓库
  store,
  beforeCreate(){
    Vue.prototype.$API = API
    Vue.prototype.$bus = this
  }
}).$mount('#app')
