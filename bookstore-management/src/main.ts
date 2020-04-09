import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
// 导入全局样式表
import './assets/css/global.css'
// 导入第三方图库样式
import './assets/fontcss/iconfont.css'
// 引入 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import router from './router'
import store from './store'
// 导入 echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(ElementUI)
//挂载到原型对象（配置请求的根路径）
axios.defaults.baseURL = ''
// axios 请求拦截
axios.interceptors.request.use(config => {
  // 为请求头对象，添加Token 验证 Authorization 字段
  // console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
