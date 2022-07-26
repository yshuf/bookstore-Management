// eslint-disable-next-line prettier/prettier
import Vue from 'vue';
import Vuex from 'vuex';
/**
 *  项目中使用的语言是TypeScript，我在项目中引入js的时候，发现报错：提示信息为：无法找到模块“xxx.js”的声明文件 xxx隐式拥有 “any” 类型
 *
 */
import createPersistedState, {
  sStorageKey,
  isClearCache
} from './persisted-state.js';
import { state, getters, actions, mutations } from './root';
// import modules from '../service/store/index.js';

Vue.use(Vuex);

export { sStorageKey, isClearCache };
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  /**
   * 把一些不常更新的数据(例如状态信息、用户信息、token等)保存在本地，减少请求次数
   * * */
  plugins: [
    /* function (store) {
      // 自定义 vuex 插件，Vue 还未初始化完成
    }, */
    createPersistedState // persistedState 默认使用 localStorage 来固化数据
  ]
});
