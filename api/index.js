import { get, post } from './request.js';

const baseUrl = 'https://www.fastmock.site/mock/f5b0436d25760cd9e4b88fdf3de4d459/api';

// const baseUrl = 'http://localhost:8081/api'

// const baseUrl = 'http://121.41.79.10:8080/api'

export default {
	getBookContent(params) {
		return get(`${baseUrl}/get/biquge/content`, params)
		// return get(`${baseUrl}/get/book/content`, params)
	},
	searchBook(params) {
		return get(`${baseUrl}/get/biquge/search`, params)
		// return get(`${baseUrl}/search/book`, params)
	},
	getBookChapter(params) {
		return get(`${baseUrl}/get/biquge/chapter`, params)
		// return get(`${baseUrl}/get/book/chapter`, params)
	},
	getBookDetail(params) {
		return get(`${baseUrl}/get/biquge/detail`, params)
		// return get(`${baseUrl}/get/book/detail`, params)
	}
}
