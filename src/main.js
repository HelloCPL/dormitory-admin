import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 引入请求
import http from '@/api/index'
Vue.prototype.$http = http

// 引入配置 config
import config from '@/config/config'
Vue.prototype.$config = config

// 定义路由类型
window._routerType = ''

// 应用lodash
import _ from 'lodash'
Vue.prototype._ = _

// 设置根元素大小
import '@js/htmlFontSize.js'
// 引用公共样式
import '@css/style.scss'

// 引入全局组件
import '@com/global/index'

// 引入element UI
import ElementUI from 'element-ui';
import {
  message
} from '@js/interaction'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.$message = message

// 引入 vue-happy-scroll 滚动条插件
import {
  HappyScroll
} from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
Vue.component('happy-scroll', HappyScroll)

// 引入 dayjs 时间处理
import dayjs from 'dayjs'
Vue.prototype.$dayjs = dayjs

// 密码加密
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

// 引入过滤器
import '@js/filters'

// 引入混入的全局方法
import common from '@/common'
Vue.use(common)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')