import { get, post } from './request.js';

const baseUrl = 'https://www.fastmock.site/mock/f5b0436d25760cd9e4b88fdf3de4d459/api';

export default {
	getBookContent(params) {
		return get(`${baseUrl}/get/biquge/content`, params)
	},
	searchBook(params) {
		return get(`${baseUrl}/get/biquge/search`, params)
	},
	getBookChapter(params) {
		return get(`${baseUrl}/get/biquge/chapter`, params)
	},
	getBookDetail(params) {
		return get(`${baseUrl}/get/biquge/detail`, params)
	}
}
