/** 
 * 存储菜单相关信息
 */

//  根据路由寻找对应的权限
import _ from 'lodash'

let menus = JSON.parse(sessionStorage.getItem('menus')) || []

const state = {
  menus: menus, // 菜单信息 包含权限信息
  homeMenuId: '', // 当前头部模块选中id
  currentMenu: {}, // 当前选中的菜单
}

const getters = {
  menus: state => state.menus,
  homeMenuId: state => state.homeMenuId,
  currentMenu: state => state.currentMenu,
  subMenus: (state) => { // 返回二级菜单
    let homeMenuId = state.homeMenuId
    let arr = []
    state.menus.find(item => {
      if (item.menuId === homeMenuId) {
        arr = item.children
        return true
      }
    })
    return arr
  },
  permissions: state => (to) => { // 返回对应路由的权限
    let perm = []
    let menus = state.menus
    if (!menus.length) menus = JSON.parse(sessionStorage.getItem('menus')) || []
    var findPermissions = (to, menus) => {
      menus.forEach(item => {
        if (item.to == to) {
          perm = item.permissions
          return
        }
        if (item.children.length) {
          findPermissions(to, item.children)
        }
      })
    }
    findPermissions(to, menus)
    return perm
  }
}

const actions = {
  setMenus({
    commit
  }, value) {
    commit('setMenus', value)
  },
  // 修改头部选中路由模块
  changeMenus({
    commit
  }, value) {
    commit('changeMenus', value)
  },
  setHomeMenuId({
    commit
  }, value) {
    commit('setHomeMenuId', value)
  },
  setCurrentMenu({
    commit
  }, value) {
    commit('setCurrentMenu', value)
  },


  // 重置数据 用于退出
  resetMenusInfo({
    commit
  }) {
    commit('resetMenusInfo')
  }
}

const mutations = {
  setMenus(state, value) {
    value = value || []
    state.menus = value
  },
  // 修改头部选中路由模块
  changeMenus(state, value) {
    state.menus.forEach(item => {
      if (item.menuId === value) {
        item.selected = true
      } else {
        item.selected = false
      }
    })
  },
  setHomeMenuId(state, value) {
    state.homeMenuId = value
    sessionStorage.setItem('homeMenuId', value)
  },
  setCurrentMenu(state, value) {
    state.currentMenu = value
    sessionStorage.setItem('currentMenu', JSON.stringify(value))
  },

  // 重置数据 用于退出
  resetMenusInfo(state) {
    state.menus = []
    state.homeMenuId = ''
    state.currentMenu = {}
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}