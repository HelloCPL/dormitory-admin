<template>
  <div class="we-width-100pc we-height-100pc we-flex wrapper">
    <div class="we-shrink">
      <home-menu :menus="sideMenus" :activeTo="activeTo" @onRowClick="onRowClick"></home-menu>
    </div>
    <div class="we-flex-1 we-relative we-bg right-box">
      <div class="we-width-100pc we-height-100pc we-bg-white we-flex-column content-box">
        <div class="we-shrink">
          <home-tab :menus="tabMenus" @onTabClick="onTabClick" @onTabDetele="tabdeleteMethods" :activeTo="activeTo"></home-tab>
        </div>
        <div class="we-flex-1 we-scroll-y-0">
          <keep-alive :include="includes">
            <router-view />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import homeMenu from '@com/home/homeMenu.vue'
import homeTab from '@com/home/homeTab.vue'
export default {
  name: 'throughTrain',
  provide() {
    return {
      newTab: this.newTab,
      tabdeleteMethods: this.tabdeleteMethods
    }
  },
  components: {
    homeMenu,
    homeTab
  },
  data() {
    return {
      activeTo: '', // 当前路由
      includes: [], // 缓存
      tabMenus: [], // tab 集合
      sideMenus: [], // 左侧导航集合
      loadCount: 0,
      timeId: null
    }
  },
  computed: {
    ...mapGetters(['subMenus', 'currentMenu'])
  },
  mounted() {
    this.refreshRouter()
  },
  methods: {
    ...mapActions(['setCurrentMenu']),

    // 刷新加载路由
    refreshRouter() {
      this.sideMenus = this._.cloneDeep(this.subMenus)
      if (this.sideMenus.length) {
        this.sideMenus.forEach(item => {
          item.show = false
        })
        let item = this.sideMenus[0]
        if (item.children.length) {
          item.show = true
          let list = item.children[0]
          this.onRowClick(list)

        } else {
          this.onRowClick(item)
        }

      } else if (!this.sideMenus.length && this.loadCount < 10) { // 防止刷新时导航数据F异步请求
        if (this.timeId) clearTimeout(this.timeId)
        this.timeId = setTimeout(() => {
          this.loadCount += 1
          this.refreshRouter()
        }, 150)
      }
    },

    // 左侧导航点击回调
    onRowClick(item) {
      if (this.activeTo === item.to) return
      // 设置当前路由菜单，用于刷新
      this.setCurrentMenu(item)
      // 添加栏目
      this.newTab(item)
    },

    // 标题栏点击回调
    onTabClick(item) {
      if (this.activeTo === item.to) return
      this.newTab(item)
    },

    // tab 栏目删除 item 为对象 to 要删除的路由（必填） target 目标路由（非必填，不填默认前一个）
    tabdeleteMethods(item) {
      // 删除缓存
      this.deleteIncludes(item)
      // 删除后的路由跳转
      this.changeRouterPush(item)
      // 出栈
      this.deleteTabMenus(item)
    },

    // 添加新路由
    newTab(data) {
      let item = {
        name: data.name,
        to: data.to,
        params: data.params,
        query: data.query
      }
      // 添加缓存
      this.pushIncludes(item)
      // 跳转路由
      this.routerPush(item)
      // 入栈
      this.pushTabMenus(item)
    },

    // tab 添加栏目
    pushTabMenus(data) {
      let index = -1
      this.tabMenus.find((item, i) => {
        if (item.to === data.to) {
          index = i
          return true
        }
      })
      if (index === -1) {
        this.tabMenus.push(data)
      } else {
        this.tabMenus.splice(index, 1, data)
      }
    },

    // tab 删除一项
    deleteTabMenus(data) {
      let index = -1
      this.tabMenus.find((item, i) => {
        if (item.to === data.to) {
          index = i
          return true
        }
      })
      if (index !== -1) this.tabMenus.splice(index, 1)
    },

    // 路由跳转
    routerPush(item) {
      if (item.to === this.activeTo) return
      let routesName = this.$route.name
      if (item.to === routesName) {
        this.activeTo = item.to
        return
      }
      let obj = {
        name: item.to
      }
      if (item.params) {
        obj.params = item.params
      } else if (item.query) {
        obj.query = item.query
      }
      this.$router.push(obj)
      this.activeTo = item.to
    },

    // 删除后的路由跳转
    changeRouterPush(data) {
      if (data.to != this.activeTo) return
      let index = -1
      this.tabMenus.find((item, i) => {
        if (data.target) {
          if (item.to === data.target) {
            index = i
            return true
          }
        } else {
          if (item.to === data.to) {
            index = i
            return true
          }
        }
      })
      if (index !== -1) {
        if (!data.target)
          index = index === 0 ? 1 : index - 1
        let row = this._.cloneDeep(this.tabMenus[index])
        let obj = {
          name: row.to
        }
        if (row.params) {
          obj.params = row.params
        } else if (row.query) {
          obj.query = row.query
        }
        this.$router.push(obj)
        this.activeTo = row.to
      }
    },

    // 添加缓存
    pushIncludes(data) {
      let flag = true
      this.includes.find(item => {
        if (item.to === data.to) {
          flag = false
          return true
        }
      })
      if (flag) this.includes.push(data.to)
    },

    // 删除缓存
    deleteIncludes(data) {
      this.includes.forEach((item, i) => {
        if (item === data.to) {
          this.includes.splice(i, 1)
        }
      })
    },

  },

}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
