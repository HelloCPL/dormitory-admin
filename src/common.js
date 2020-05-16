// vue 页面 全局变量或方法
import {
  mapGetters
} from 'vuex'
import _ from 'lodash'
export default {
  install: function (Vue, params) {
    params = params || {}
    Vue.mixin({
      created() {

      },
      computed: {
        ...mapGetters(['currentRoute'])
      },
      methods: {
        // 路由前进
        routerPush(params) {
          if (_.isString(params))
            if (params === this.currentRoute) return
          if (_.isObject(params))
            if (params.name === this.currentRoute) return
          console.log(111, params, this.currentRoute)
          window._routerType = 'push'
          this.$router.push(params)
        },
        // 路由替换
        routerReplace(params) {
          window._routerType = 'replace'
          this.$router.replace(params)
        },
        // 路由后退
        routerBack() {
          window._routerType = 'back'
          this.$router.go(-1)
        },

      },
    })
  }
}