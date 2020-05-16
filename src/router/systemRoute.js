/**
 * systen 模块所需的子路由
 */

const systemRoute = [
  // 菜单管理页面
  {
    path: 'menus',
    name: 'menus',
    component: () => import('@views/systemModule/menus'),
    meta: {
      title: '菜单管理'
    }
  },
  // 权限管理页面
  {
    path: 'permissions',
    name: 'permissions',
    component: () => import('@views/systemModule/permissions'),
    meta: {
      title: '权限管理'
    }
  },
  // 管理员角色页面
  {
    path: 'roles',
    name: 'roles',
    component: () => import('@views/systemModule/roles'),
    meta: {
      title: '角色管理'
    }
  },
  // 管理员管理页面
  {
    path: 'adminUser',
    name: 'adminUser',
    component: () => import('@views/systemModule/adminUser'),
    meta: {
      title: '管理员信息'
    }
  },
  // 宿舍栋管理页面
  {
    path: 'dorBuilding',
    name: 'dorBuilding',
    component: () => import('@views/systemModule/dorBuilding'),
    meta: {
      title: '宿舍栋管理'
    }
  },
  // 房间管理页面
  {
    path: 'dorRoom',
    name: 'dorRoom',
    component: () => import('@views/systemModule/dorRoom'),
    meta: {
      title: '宿舍房间管理'
    }
  },
  // 学生信息管理页面
  {
    path: 'studentUser',
    name: 'studentUser',
    component: () => import('@views/systemModule/studentUser'),
    meta: {
      title: '学生信息'
    }
  },
  // 学生信息新增或编辑编辑页面
  {
    path: 'studentUserEdit',
    name: 'studentUserEdit',
    component: () => import('@views/systemModule/studentUserEdit'),
    meta: {
      title: '编辑学生信息'
    }
  }
]

export default systemRoute