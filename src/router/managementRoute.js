/**
 * management 模块所需的子路由
 */

const managementRoute = [
  // 图片管理
  {
    path: 'images',
    name: 'images',
    component: () => import('@views/managementModule/images'),
    meta: {
      title: '图片管理'
    }
  },
  // 所有图片
  {
    path: 'imagesAll',
    name: 'imagesAll',
    component: () => import('@views/managementModule/imagesAll'),
    meta: {
      title: '所有图片'
    }
  },
  // 图片管理 新增与编辑
  {
    path: 'imagesEdit',
    name: 'imagesEdit',
    component: () => import('@views/managementModule/imagesEdit'),
    meta: {
      title: '编辑图片'
    }
  },
  // 资讯公告管理
  {
    path: 'notices',
    name: 'notices',
    component: () => import('@views/managementModule/notices'),
    meta: {
      title: '资讯公告管理'
    }
  },
  // 资讯公告管理 新增与编辑
  {
    path: 'noticesEdit',
    name: 'noticesEdit',
    component: () => import('@views/managementModule/noticesEdit'),
    meta: {
      title: '编辑资讯公告'
    }
  }
]

export default managementRoute