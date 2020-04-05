import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
// 导入全局样式表
import "./assets/css/global.css";
// 导入第三方图库样式
import "./assets/fontcss/iconfont.css"
// 引入 ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from 'axios';
import router from "./router";
import store from "./store";


Vue.use(ElementUI);
//挂载到原型对象（配置请求的根路径）
axios.defaults.baseURL=''
Vue.prototype.$http=axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
