/** 
 * 存储菜单相关信息
 */

//  根据路由寻找对应的权限
import _ from 'lodash'

// let menus = JSON.parse(sessionStorage.getItem('menus')) || []

let menus = JSON.parse(sessionStorage.getItem('menus')) || [{
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
    module: [{
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
      // {
      //   title: '宿舍报修',
      //   routeName: 'dorRepair',
      //   power: 'admin:dormitoryModule:dorRepair',
      //   status: 0
      // },
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
  initMenusInfo({
    commit
  }) {
    commit('initMenusInfo')
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
  initMenusInfo(state) {
    state.menus = []
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}