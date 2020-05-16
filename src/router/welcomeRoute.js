/**
 * welcome 模块所需的子路由
 */

const welcomeRoute = [
  {
    path: 'welcome',
    name: 'welcome',
    component: () => import('@views/welcomeModule/welcome'),
  }
]

export default welcomeRoute