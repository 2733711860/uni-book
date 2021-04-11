/* 
  带参数：this.$openPage({
					name: 'detail',
					query: {
						id: 123
					}
				})
	
	不传参：this.$openPage('detail');
	
	取参数：this.$parseURL()
 
 */

const toString = Object.prototype.toString

function isObject(value) {
	return toString.call(value) === '[object Object]'
}

function isString(value) {
	return toString.call(value) === '[object String]'
}

function isDefault(value) {
	return value === void 0
}

function openPage(args) {
	let name, query = {},
		queryStr = null,
		path, type, isName = false
	switch (true) {
		case isObject(args):
			({
				name,
				query = {}
			} = args)
			break
		case isString(args):
			name = args
			break
		default:
			throw new Error('参数必须是对象或者字符串')
	}
	if (isObject(query)) {
		queryStr = encodeURIComponent(JSON.stringify(query))
	} else {
		throw new Error('query数据必须是Object')
	}
	this.$minRouter.forEach(item => {
		if (item.name === name) {
			path = item.path
			type = item.type || 'navigateTo'
			isName = true
		}
	})
	if (!isName) {
		throw new Error(`没有${name}页面`)
	}
	if (!['navigateTo', 'switchTab', 'reLaunch', 'redirectTo'].includes(type)) {
		throw new Error(`name:${name}里面的type必须是以下的值['navigateTo', 'switchTab', 'reLaunch', 'redirectTo']`)
	}
	return new Promise((resolve, reject) => {
		uni[type]({
			url: `/${path}?query=${queryStr}`,
			success: resolve,
			fail: reject
		})
	})
}

function parseURL() {
	let pages = getCurrentPages();
	let curPage = pages[pages.length - 1];
	const query = curPage.options.query
	return JSON.parse(decodeURIComponent(query))
	
	// const query = this.$root.$mp.query ? this.$root.$mp.query.query : '';
	// if (query) {
	// 	return JSON.parse(decodeURIComponent(query))
	// } else {
	// 	return {}
	// }
}

function goBack(delta = 1) {
	uni.navigateBack({ delta })
}

function install(Vue) {
	Vue.mixin({
		beforeCreate: function() {
			if (!isDefault(this.$options.minRouter)) {
				Vue._minRouter = this.$options.minRouter
			}
		}
	})
	Object.defineProperty(Vue.prototype, '$minRouter', {
		get: function() {
			return Vue._minRouter._router
		}
	})
	Object.defineProperty(Vue.prototype, '$parseURL', {
		get: function() {
			return Vue._minRouter.parseURL
		}
	})
	Object.defineProperty(Vue.prototype, '$openPage', {
		get: function() {
			return Vue._minRouter.openPage
		}
	})
	Object.defineProperty(Vue.prototype, '$goBack', {
		get: function() {
			return Vue._minRouter.goBack
		}
	})
}

function MinRouter(options) {
	if (!(this instanceof MinRouter)) {
		throw Error("MinRouter是一个构造函数，应该用`new`关键字调用")
	}
	isDefault(options) && (options = {})
	this.options = options
	this._router = options.routes || []
}
MinRouter.install = install
MinRouter.prototype.openPage = openPage
MinRouter.prototype.parseURL = parseURL
MinRouter.prototype.goBack = goBack
export default MinRouter
