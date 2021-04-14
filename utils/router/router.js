import MinRouter from './MinRouter'
// 配置路由
const router = new MinRouter({
	routes: [
		{
			// 页面路径
			path: 'pages/index/index',
			// type必须是以下的值['navigateTo', 'switchTab', 'reLaunch', 'redirectTo']
			// 跳转方式(默认跳转方式)
			type: 'navigateTo',
			name: 'index'
		},
		{
			path: 'pages/search/search',
			name: 'search'
		},
		{
			path: 'pages/rank/rank',
			name: 'rank'
		},
		{
			path: 'pages/category/category',
			name: 'category'
		},
		{
			path: 'pages/my/my',
			name: 'my'
		},
		{
			path: 'pages/detail/detail',
			name: 'detail'
		},
		{
			path: 'pages/read/read',
			name: 'read'
		},
		{
			path: 'pages/shelf/shelf',
			name: 'shelf'
		},
		{
			path: 'pages/searchResult/searchResult',
			name: 'searchResult'
		}
	]
})
export default router
