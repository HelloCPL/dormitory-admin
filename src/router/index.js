/**
 * meta 字段说明
 *   noAuth 为 true 不需要路由守卫
 *   noKeepAlive 为 true 不需要缓存
 *   noSubDisplay 为 true 不需要二级导航栏显示
 *   title 标题
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫 需要登录后才能访问
// 1. to.meta.noAuth 为真则不需要校验 否则
// 2. 公共存储 isAuth 为真 next 否则重定向到login
import _ from 'lodash'
import store from '@/store/index'

router.beforeEach((to, from, next) => {
  if (to.meta.noAuth) {
    next()
  } else {
    let isAuth = store.getters.isAuth
    if (isAuth) {
      next()
    } else {
      window._routerType = ''
      next({
        path: '/login'
      })
    }
  }
})

export default router