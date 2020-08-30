// 以 js 形式使用组件

import Vue from 'vue'
const self = {
  componentList: {},
  createComponent({
    name, // 组件名称
    component, // 组件 必传
    props, // props 参数
    single = true, // 是否是单例模式， 默认 true
  }) {
    let className = 'global' + (new Date().valueOf())
    name = name || className
    // 单例模式直接返回
    if (single && self.componentList[name]) return self.componentList[name]
    // 新建vue实例
    const instance = new Vue({
      render: h => h(component, {
        props
      })
    }).$mount()
    document.body.appendChild(instance.$el)
    const comp = instance.$children[0]
    if (instance.$el.classList) instance.$el.classList.add(className)
    // 设置移除方法
    comp.remove = () => {
      let box = document.querySelector('.' + className)
      if (box) box.parentNode.removeChild(box)
      if (self.componentList[name]) delete self.componentList[name]
    }
    if (single) self.componentList[name] = comp
    return comp
  }
}

// export const createComponent = self.createComponent
export default self.createComponent
// }