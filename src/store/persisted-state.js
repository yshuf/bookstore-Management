/**
 * @desc 缓存设置
 */
import persistedState from 'vuex-persistedstate';

const sStorageKey = 'ysh-books';
const paths = [];
const isClearCache = false;
const createPersistedState = persistedState({
  key: sStorageKey,
  storage: window.localStorage,
  paths
});
export { sStorageKey, isClearCache };
export default createPersistedState;
