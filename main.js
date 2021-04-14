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

 // vuex
import store from './utils/store';

// 自定义指令
Vue.use((Vue) => {
  ((requireContext) => {
    const arr = requireContext.keys().map(requireContext);
    (arr || []).forEach((directive) => {
      directive = directive.__esModule && directive.default ? directive.default : directive;
      Object.keys(directive).forEach((key) => {
        Vue.directive(key, directive[key]);
      });
    });
  })(require.context('@/utils/directive/', false, /^\.\/.*\.js$/));
});

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
		minRouter,
		store
})
app.$mount()
