<template>
  <div class="we-flex-column we-width-100pc we-bg home-container">
    <home-header @clickMenu="clickMenu" />
    <div class="we-flex-1 we-width-100pc we-relative">
      <div class="we-width-100pc we-height-100pc box">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import homeHeader from '@com/home/home-header'

export default {
  name: 'Home',
  components: {
    homeHeader,
  },
  data() {
    return {
      timeId: null,
      loadCount: 0,
    }
  },
  computed: {
    ...mapGetters(['subMenus', 'currentMenu'])
  },
  created() {
    // 解决空路经问题
    let routeName = this.$route.name
    if (routeName === 'home') {
      this.refreshRouter()
    }
  },
  methods: {
    refreshRouter() {
      this.sideMenus = this._.cloneDeep(this.subMenus)
      if (this.sideMenus.length) {
        let routeName = ''
        let item = this.sideMenus[0]
        if (item.children.length) {
          routeName = item.children[0]['to']
        } else {
          routeName = item.to
        }
        if (routeName) {
          this.$router.replace({
            name: routeName
          })
        }
      } else if (!this.sideMenus.length && this.loadCount < 10) { // 防止刷新时导航数据F异步请求
        if (this.timeId) clearTimeout(this.timeId)
        this.timeId = setTimeout(() => {
          this.loadCount += 1
          this.refreshRouter()
        }, 150)
      }
    },

    // 更改菜单
    clickMenu(item) {
      this.$router.replace({
        name: item.to
      })
    }
  }

}
</script>

<style lang="scss" scoped>
@import "./Home.scss";
</style>
