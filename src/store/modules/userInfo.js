/**
 * 主要存储用户相关信息
 */

let _ = require('lodash')
// 获取缓存 token
let _isAuth = sessionStorage.getItem('isAuth')
// 获取缓存用户信息
let _userInfo = sessionStorage.getItem('userInfo')
if (_userInfo) {
  try {
    let obj = JSON.parse(_userInfo)
    if (_.isObject(obj))
      _userInfo = obj
  } catch (e) {}
}

const state = {
  // menus: menus, // 菜单
  // subMenus: [], // 子菜单
  userInfo: _userInfo || {},
  isAuth: _isAuth || null
}

const getters = {
  // menus: state => state.menus,
  // subMenus: state => state.subMenus,
  userInfo: state => state.userInfo,
  isAuth: state => state.isAuth,
}

const actions = {
  // setSubMenus({
  //   commit
  // }, index) {
  //   commit('setSubMenus', index)
  // },
  setUserInfo({
    commit
  }, params) {
    commit('setUserInfo', params)
  },
  setIsAuth({
    commit
  }, value) {
    commit('setIsAuth', value)
  },
  // 重置 清空数据
  resetUserInfo({
    commit
  }) {
    commit('resetUserInfo')
  }
}

const mutations = {
  // 'setSubMenus'(state, index) {
  //   if (state.menus[index] && _.isArray(state.menus[index]['module']))
  //     state.subMenus = state.menus[index]['module']
  // },
  'setUserInfo'(state, params) {
    state.userInfo = params
  },
  'setIsAuth'(state, value) {
    state.isAuth = value
  },
  'resetUserInfo'(state) {
    state.userInfo = {}
    state.isAuth = null
  }
}



export default {
  state,
  getters,
  actions,
  mutations
}