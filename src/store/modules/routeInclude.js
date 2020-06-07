/**
 * 主要 页面缓存 与 home 子页面 缓存组件
 */

let _ = require('lodash')

const state = {
  routeList: [ // 二级显示 自定义路由栈 用于展示组件 存储整个路由对象
    // {...avatar}
  ],
  routeInclude: [], // 缓存组件 只存储路由name
  currentRoute: '', // 当前路由
  lastRoute: '', // 上一个路由
}

const getters = {
  routeList: state => state.routeList,
  routeInclude: state => state.routeInclude,
  currentRoute: state => state.currentRoute,
  lastRoute: state => state.lastRoute,
}

const actions = {
  // 新增自定义路由栈
  addRouteList({
    commit
  }, params) {
    commit('addRouteList', params)
  },
  // 替换自定义路由栈
  replaceRouteList({
    commit
  }, params) {
    commit('replaceRouteList', params)
  },
  // 主页面缓存组件操作方法
  addRouteInclude({
    commit
  }, routeName) {
    commit('addRouteInclude', routeName)
  },
  replaceRouteInclude({
    commit
  }, routeName) {
    commit('replaceRouteInclude', routeName)
  },

  initRoute({
    commit
  }) {
    commit('initRoute')
  },

  // 设置当前路由
  setCurrentRoute({
    commit
  }, routeName) {
    commit('setCurrentRoute', routeName)
  },

  // 设置上一个路由
  setLastRoute({
    commit
  }, routeName) {
    commit('setLastRoute', routeName)
  },


}

const mutations = {
  'addRouteList'(state, params) {
    if (params && _.isObject(params) && params.to && params.from) {
      // to 路由存在 更新 to； to 路由不存在 在 from 后面追加 
      let indexTo = _.findIndex(state.routeList, o => {
        return o.name === params.to.name
      })
      let item = copyRoute(params.to)
      let flag = item && (item.name || item.path)
      if (!flag) return
      if (indexTo == -1) {
        let indexFrom = _.findIndex(state.routeList, o => {
          return o.name = params.from.name
        })
        if (indexFrom == -1) {
          state.routeList.push(item)
        } else {
          state.routeList.splice(indexFrom, 0, item)
        }
      } else {
        state.routeList.splice(indexTo, 1, item)
      }
      // console.log('push', state.routeList)
    }
  },

  'replaceRouteList'(state, params) {
    if (params && _.isObject(params) && params.to && params.from) {
      // to 路由存在 先删除； from 路由存在 用to替换 不存在 直接添加 to 
      let indexTo = _.findIndex(state.routeList, o => {
        return o.name = params.to.name
      })
      if (indexTo != -1)
        state.routeList.splice(indexTo, 1)
      let indexFrom = _.findIndex(state.routeList, o => {
        return o.name = params.from.name
      })
      let item = copyRoute(params.to)
      let flag = item && (item.name || item.path)
      if (!flag) return
      if (indexFrom == -1) {
        state.routeList.push(item)
      } else {
        state.routeList.splice(indexFrom, 1, item)
      }
      // console.log('replace', state.routeList)
    }
  },

  'addRouteInclude'(state, params) {
    if (params && _.isObject(params) && params.toName) {
      // toName 路由存在 更新 toName； toName 路由不存在 追加 
      let indexTo = _.indexOf(state.routeInclude, params.toName)
      if (indexTo == -1) {
        state.routeInclude.push(params.toName)
      } else {
        state.routeInclude.splice(indexTo, 1, params.toName)
      }
      // console.log('push', state.routeInclude)
    }
  },

  'replaceRouteInclude'(state, params) {
    if (params && _.isObject(params) && params.toName && params.fromName) {
      // toName 路由存在 更新 toName； toName 路由不存在 追加 fromName 存在删除
      let indexTo = _.indexOf(state.routeInclude, params.toName)
      if (indexTo == -1) {
        state.routeInclude.push(params.toName)
      } else {
        state.routeInclude.splice(indexTo, 1, params.toName)
      }
      let indexFrom = _.indexOf(state.routeInclude, params.fromName)
      if (indexFrom != -1) {
        state.routeInclude.splice(indexFrom, 1)
      }
      // console.log('replace', state.routeInclude)
    }
  },

  'initRoute'(state) {
    state.routeList = []
    state.routeInclude = []
  },

  'setCurrentRoute'(state, routeName) {
    state.currentRoute = routeName
  },

  'setLastRoute'(state, routeName) {
    state.lastRoute = routeName
  },

}



export default {
  state,
  getters,
  actions,
  mutations
}

function copyRoute(route) {
  if (_.isObject(route)) {
    let obj = {
      fullPath: route.fullPath,
      hash: route.hash,
      name: route.name,
      path: route.path,
      meta: _.assign({}, route.meta),
      params: _.assign({}, route.params),
      query: _.assign({}, route.query),
    }
    return obj
  } else {
    return route
  }
}

/**
 *  ------------------- 路由处理思路： -------------------------
 * 
 * routeInclude 缓存组件集合
 * routeList 二级导航栏路由集合
 * 
 * 一级路由的跳转
 *    点击相同 不做任何处理
 *    不同点击 
 *        1. 清空缓存组件集合 
 *        2. 清空二级导航栏路由集合，如果此一级路由有二级导航，则自动将跳转到二级导航第一个目标路由
 * 
 * 二级路由的跳转
 *     routerPush 默认缓存 
 *         to.meta.noKeepAlive 为真不缓存
 *         
 * 
 * 
 * 
 * 
 * 
 * 
 *  */