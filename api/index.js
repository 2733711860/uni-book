import { get, post } from './request.js';

const baseUrl = 'https://www.fastmock.site/mock/f5b0436d25760cd9e4b88fdf3de4d459/api';

export default {
	getSearch(params) {
		return get(`${baseUrl}/search/book`, params)
	}
}
