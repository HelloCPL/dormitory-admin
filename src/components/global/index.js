import Vue from 'vue'
import upperFirst from 'lodash/upperFirst' // 首字母大写
import camelCase from 'lodash/camelCase' // 驼峰命名法
// 全局注册global目录下的所有组件及其子目录下的子组件
const requireComponent = require.context('./', true, /\.vue$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')))
  Vue.component(componentName, componentConfig.default || componentConfig)
})