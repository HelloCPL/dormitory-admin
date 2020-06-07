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

let menus = [{
    title: '首页',
    routeName: 'welcomeModule',
    power: 'admin:welcomeModule',
    status: 0,
    module: [{
      title: '欢迎',
      routeName: 'welcome',
      power: 'admin:welcomeModule:welcome',
      status: 0
    }]
  },
  {
    title: '宿舍管理',
    routeName: 'dormitoryModule',
    power: 'admin:dormitoryModule',
    status: 1,
    module: [
      {
        title: '宿舍缴费',
        routeName: 'dorPayment',
        power: 'admin:dormitoryModule:dorPayment',
        status: 0
      },
      // {
      //   title: '缴费汇总',
      //   routeName: 'dorPaymentCalculate',
      //   power: 'admin:dormitoryModule:dorPaymentCalculate',
      //   status: 0
      // },
      {
        title: '宿舍报修',
        routeName: 'dorRepair',
        power: 'admin:dormitoryModule:dorRepair',
        status: 0
      },
      {
        title: '宿舍申请',
        routeName: 'dorApply',
        power: 'admin:dormitoryModule:dorApply',
        status: 0
      },
      {
        title: '投诉与建议',
        routeName: 'dorSuggest',
        power: 'admin:dormitoryModule:dorSuggest',
        status: 0
      },
      {
        title: '宿舍检查',
        routeName: 'dorCheck',
        power: 'admin:dormitoryModule:dorCheck',
        status: 0
      },
      {
        title: '学生个人申请',
        routeName: 'stuApply',
        power: 'admin:dormitoryModule:stuApply',
        status: 0
      },
      {
        title: '学生宿舍个人物品',
        routeName: 'stuBelongings',
        power: 'admin:dormitoryModule:stuBelongings',
        status: 0
      },
      {
        title: '离返校登记',
        routeName: 'stuLeaveAndReturn',
        power: 'admin:dormitoryModule:stuLeaveAndReturn',
        status: 0
      }
    ]
  },
  {
    title: '资讯公告',
    routeName: 'managementModule',
    power: 'admin:managementModule',
    status: 1,
    module: [{
        title: '图片管理',
        routeName: 'images',
        power: 'admin:managementModule:images',
        status: 0
      },
      {
        title: '资讯公告管理',
        routeName: 'notices',
        power: 'admin:managementModule:notices',
        status: 0
      }
    ]
  },
  {
    title: '系统管理',
    routeName: 'systemModule',
    power: 'admin:systemModule',
    status: 1,
    module: [
      // {
      //   title: '权限管理',
      //   routeName: 'permissions',
      //   power: 'admin:systemModule:permissions',
      //   status: 0
      // },
      // {
      //   title: '菜单管理',
      //   routeName: 'menus',
      //   power: 'admin:systemModule:menus',
      //   status: 0
      // },
      // {
      //   title: '角色管理',
      //   routeName: 'roles',
      //   power: 'admin:systemModule:roles',
      //   status: 0
      // },
      // {
      //   title: '管理员信息',
      //   routeName: 'adminUser',
      //   power: 'admin:systemModule:adminUser',
      //   status: 0
      // },
      {
        title: '学生信息',
        routeName: 'studentUser',
        power: 'admin:systemModule:studentUser',
        status: 0
      },
      {
        title: '宿舍栋管理',
        routeName: 'dorBuilding',
        power: 'admin:systemModule:dorBuilding',
        status: 0
      },
      {
        title: '宿舍房间管理',
        routeName: 'dorRoom',
        power: 'admin:systemModule:dorRoom',
        status: 0
      }
    ]
  }
]

const state = {
  menus: menus, // 菜单
  subMenus: [], // 子菜单
  userInfo: _userInfo || {},
  isAuth: _isAuth || null
}

const getters = {
  menus: state => state.menus,
  subMenus: state => state.subMenus,
  userInfo: state => state.userInfo,
  isAuth: state => state.isAuth,
}

const actions = {
  setSubMenus({
    commit
  }, index) {
    commit('setSubMenus', index)
  },
  setUserInfo({
    commit
  }, params) {
    commit('setUserInfo', params)
  },
  setIsAuth({
    commit
  }, value) {
    commit('setIsAuth', value)
  }
}

const mutations = {
  'setSubMenus'(state, index) {
    if (state.menus[index] && _.isArray(state.menus[index]['module']))
      state.subMenus = state.menus[index]['module']
  },
  'setUserInfo'(state, params) {
    state.userInfo = params
  },
  'setIsAuth'(state, value) {
    state.isAuth = value
  }
}



export default {
  state,
  getters,
  actions,
  mutations
}