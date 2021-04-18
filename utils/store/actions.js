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
export const setFontsize = function({ commit }, fontSize) {
  commit(types.SET_FONTSIZE, fontSize)
}

// 行高
export const setLineHeight = function({ commit }, lineHeight) {
  commit(types.SET_LINEHEIGHT, lineHeight)
}

// 翻页模式
export const setMode = function({ commit }, mode) {
  commit(types.SET_MODE, mode)
}

// 书籍列表
export const setBook = function({ state, commit }, bookObj) {
	let originBook = {
		"bookId": "",
		"bookName": "",
		"bookAuthor": "",
		"bookDesc": "",
		"bookImg": "",
		"updatedTime": "",
	  "currentIndex": -1,
		"isOnShelf": false, // 是否放入书架
		"currentPage": 1,
	  "chapters": []
	}
	let books = JSON.parse(JSON.stringify(state.bookList)); // 拷贝一份书籍列表
	let thisOne = books.find(item => item.bookId == bookObj.bookId);
	if (thisOne) { // 已有则更新
		let thisIndex = books.findIndex(item => item.bookId == bookObj.bookId);
		Object.assign(thisOne, bookObj);
		books.splice(thisIndex, 1, thisOne);
	} else { // 没有则添加
		Object.assign(originBook, bookObj);
		books.push(originBook);
	}
  commit(types.SET_BOOKLIST, books)
}
