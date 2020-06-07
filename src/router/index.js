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
  console.log(111, to, from)
  // 保存二级展示组件
  if (window._routerType === 'push' && !to.meta.noSubDisplay) { // push 入栈
    store.dispatch('addRouteList', {
      from,
      to
    })
  } else if (window._routerType === 'replace' && !to.meta.noSubDisplay) { // replace 替换
    store.dispatch('replaceRouteList', {
      from,
      to
    })
  } else if (window._routerType === 'back') {
    store.dispatch('replaceRouteList', {
      from,
      to
    })
  }

  if (to.meta.noAuth) {
    next()
  } else {
    let isAuth = store.getters.isAuth
    console.log('isAuth', isAuth)
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

// 组件缓存与销毁处理
// routerPush 默认 缓存
// routerReplace 默认替换后缓存
// routerBack 默认 销毁 from 组件
// routerClose 关闭 组件
// noKeepAlive 为 true 不需要缓存

router.afterEach((to, from) => {
  // 保存二级展示需要缓存的组件
  if (window._routerType === 'push' && !to.meta.noKeepAlive) { // push 入栈
    store.dispatch('addRouteInclude', {
      fromName: from.name,
      toName: to.name
    })
    // 设置当前路由与上一个路由
    store.dispatch('setCurrentRoute', to.name)
    store.dispatch('setLastRoute', from.name)
  } else if (window._routerType === 'replace' && !to.meta.noKeepAlive) { // replace 替换
    store.dispatch('replaceRouteInclude', {
      fromName: from.name,
      toName: to.name
    })
    // 设置当前路由与上一个路由
    store.dispatch('setCurrentRoute', to.name)
  } else if (window._routerType === 'back') {
    store.dispatch('replaceRouteInclude', {
      fromName: from.name,
      toName: to.name
    })
    // 设置当前路由与上一个路由
    store.dispatch('setCurrentRoute', to.name)
  }
  console.log(666)

  console.log(222, to, from)
  console.log(666)
  console.log(11111, store.getters.routeInclude)
  console.log(666)


  window._routerType = ''
})

export default router