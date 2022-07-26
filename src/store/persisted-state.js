/**
 * @desc 缓存设置
 */
import persistedState from 'vuex-persistedstate';

const sStorageKey = 'data-center';
const paths = [
  'menus',
  'selectMenu',
  'token',
  'userInfo',
  'currentChain',
  'currentEnt',
  'mapColorConfig',
  'colonyList',
  'colonyClassifyList',
  'menusMap',
  'currentMenu'
];
const isClearCache = false;
const createPersistedState = persistedState({
  key: sStorageKey,
  storage: window.localStorage,
  paths
});
export { sStorageKey, isClearCache };
export default createPersistedState;
