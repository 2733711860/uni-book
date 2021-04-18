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
	[types.SET_FONTSIZE](state, fontSize) {
	  state.fontSize = fontSize
	},
	
	// 行高
	[types.SET_LINEHEIGHT](state, lineHeight) {
	  state.lineHeight = lineHeight
	},
	
	// 书籍列表
	[types.SET_BOOKLIST](state, bookList) {
	  state.bookList = bookList
	},
	
	// 翻页模式
	[types.SET_MODE](state, mode) {
	  state.mode = mode
	},
}

export default mutations
