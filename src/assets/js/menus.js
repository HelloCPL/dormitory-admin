// 菜单

export const menus = [{
    children: [],
    menuId: 1,
    name: '首页',
    parentId: 0,
    permissions: [], // 权限
    sort: 1,
    to: 'welcome'
  }, 
  {
    children: [{
        children: [],
        menuId: 2,
        name: '宿舍缴费',
        parentId: 0,
        permissions: [],
        sort: 2,
        to: 'dorPayment'
      },
      {
        children: [],
        menuId: 2,
        name: '宿舍报修',
        parentId: 0,
        permissions: [],
        sort: 2,
        to: 'dorRepair'
      },
      {
        children: [],
        menuId: 2,
        name: '宿舍申请',
        parentId: 0,
        permissions: [],
        sort: 2,
        to: 'dorApply'
      },
      {
        children: [],
        menuId: 2,
        name: '投诉与建议',
        parentId: 0,
        permissions: [],
        sort: 2,
        to: 'dorSuggest'
      },
      {
        children: [],
        menuId: 2,
        name: '宿舍检查',
        parentId: 0,
        permissions: [],
        sort: 2,
        to: 'dorCheck'
      },
      {
        children: [],
        menuId: 2,
        name: '学生个人申请',
        parentId: 0,
        permissions: [],
        sort: 2,
        to: 'stuApply'
      },
      {
        children: [],
        menuId: 2,
        name: '学生宿舍个人物品',
        parentId: 0,
        permissions: [],
        sort: 2,
        to: 'stuBelongings'
      },
      {
        children: [],
        menuId: 2,
        name: '离返校登记',
        parentId: 0,
        permissions: [],
        sort: 2,
        to: 'stuLeaveAndReturn'
      }
    ],
    menuId: 2,
    name: '宿舍管理',
    parentId: 0,
    permissions: [], // 权限
    sort: 2,
    to: 'dormitoryModule'
  },
  {
    children: [{
        children: [],
        menuId: 2,
        name: '图片管理',
        parentId: 0,
        permissions: [],
        sort: 2,
        to: 'images'
      },
      {
        children: [],
        menuId: 2,
        name: '资讯公告管理',
        parentId: 0,
        permissions: [],
        sort: 2,
        to: 'notices'
      }
    ],
    menuId: 3,
    name: '资讯公告',
    parentId: 0,
    permissions: [], // 权限
    sort: 3,
    to: 'managementModule'
  },
  {
    children: [{
        children: [],
        menuId: 2,
        name: '学生信息',
        parentId: 0,
        permissions: [],
        sort: 2,
        to: 'studentUser'
      },
      {
        children: [],
        menuId: 2,
        name: '宿舍栋管理',
        parentId: 0,
        permissions: [],
        sort: 2,
        to: 'dorBuilding'
      },
      {
        children: [],
        menuId: 2,
        name: '宿舍房间管理',
        parentId: 0,
        permissions: [],
        sort: 2,
        to: 'dorRoom'
      }
    ],
    menuId: 4,
    name: '宿舍管理',
    parentId: 0,
    permissions: [], // 权限
    sort: 4,
    to: 'systemModule'
  },
]