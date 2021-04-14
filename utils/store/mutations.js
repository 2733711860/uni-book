import * as types from './mutation-types'

const mutations = {
	// 用户信息
  [types.SET_USER](state, user) {
    state.user = user
  },
	
	// 当前主题索引
	[types.SET_THEMEINDEX](state, themeIndex) {
	  state.themeIndex = themeIndex
	},
	
	// 字体大小
	[types.SET_FONTSIZE](state, fontsize) {
	  state.fontsize = fontsize
	},
	
	// 行高
	[types.SET_LINEHEIGHT](state, lineHeight) {
	  state.lineHeight = lineHeight
	},
}

export default mutations
