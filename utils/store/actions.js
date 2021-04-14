import * as types from './mutation-types'

// user信息
export const setUser = function({ commit }, user) {
  commit(types.SET_USER, user)
}

// 当前主题索引
export const setThemeIndex = function({ commit }, themeIndex) {
  commit(types.SET_THEMEINDEX, themeIndex)
}

// 字体大小
export const setFontsize = function({ commit }, fontsize) {
  commit(types.SET_FONTSIZE, fontsize)
}

// 行高
export const setLineHeight = function({ commit }, lineHeight) {
  commit(types.SET_LINEHEIGHT, lineHeight)
}
