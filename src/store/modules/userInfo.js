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
  userInfo: _userInfo || {}, // 用户信息
  isAuth: _isAuth || null, // token 信息
}

const getters = {
  userInfo: state => state.userInfo,
  isAuth: state => state.isAuth,
}

const actions = {
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