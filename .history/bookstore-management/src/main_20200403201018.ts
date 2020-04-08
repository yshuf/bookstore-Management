import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
// 导入全局样式表
import "./assets/css/global.css";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
