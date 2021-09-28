import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    realName: '管理员'
  },
  mutations: {},
  actions: {},
  modules: {},
  /**
   * 把一些不常更新的数据(例如状态信息、用户信息、token等)保存在本地，减少请求次数
   * * */
  plugins: [persistedState()] // persistedState 默认使用 localStorage 来固化数据
});
