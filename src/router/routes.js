import welcomeRoute from './welcomeRoute'
import dormitoryRoute from './dormitoryRoute'
import managementRoute from './managementRoute'
import systemRoute from './systemRoute'
const routes = [
  // ------------------ 有二级页面 的路由 -------------------------

  { // 主页面
    path: '/home',
    name: 'home',
    component: () => import('@views/Home'),
    children: [
      // 欢迎页面
      {
        path: 'welcomeModule',
        name: 'welcomeModule',
        component: () => import('@views/welcomeModule/index'),
        children: welcomeRoute
      },
      // 主模块
      {
        path: 'dormitoryModule',
        name: 'dormitoryModule',
        component: () => import('@views/dormitoryModule/index.vue'),
        children: dormitoryRoute
      },
      // 资讯公告模块
      {
        path: 'managementModule',
        name: 'managementModule',
        component: () => import('@views/managementModule/index'),
        children: managementRoute
      },
      // 系统管理模块
      {
        path: 'systemModule',
        name: 'systemModule',
        component: () => import('@views/systemModule/index'),
        children: systemRoute
      }
    ]
  },

  // ------------------ 只有一级页面 的路由 -------------------------

  { // 登录页面
    path: '/login',
    name: 'login',
    meta: {
      noAuth: true, // 不需要校验
      noKeepAlive: true, // 不需要缓存
      noSubDisplay: true, // 不需要二级显示
    },
    component: () => import('@views/login')
  },

  {
    path: '/',
    redirect: {name: 'welcome'}
  }

]

export default routes