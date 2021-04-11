import Vue from 'vue'
import App from './App'

// 路由
import MinRouter from './utils/router/MinRouter.js'
import minRouter from './utils/router/router.js'
Vue.use(MinRouter)

// 接口
import api from './api/index.js';
Vue.prototype.$api = api;

// uview-ui
import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
		minRouter
})
app.$mount()
