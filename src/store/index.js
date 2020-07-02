/**
 * 除了公共仓储 本地缓存数据有
 * userInfo 用户信息
 * isAuth token信息
 *  */

import Vue from 'vue'
import Vuex from 'vuex'

import userInfo from './modules/userInfo'
import menusInfo from './modules/menusInfo'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    userInfo,
    menusInfo
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []

})