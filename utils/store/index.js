import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate' // vuex持久化
// 如果vuex-persistedstate不行，可试一试插件市场mp-storage

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
	plugins: [
		createPersistedState({
			key: 'app_config_data', // 状态保存到本地的 key
			paths: [
				'user', 
				'themeIndex',
				'fontSize',
				'lineHeight',
				'bookList',
				'mode'
			], // 要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c
			storage: { // 存储方式定义
				getItem: (key) => uni.getStorageSync(key), // 获取
				setItem: (key, value) => uni.setStorageSync(key, value), // 存储
				removeItem: (key) => uni.removeStorageSync(key) // 删除
			}
		})
	]
})
