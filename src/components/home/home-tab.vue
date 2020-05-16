<template>
  <div class="we-width-100pc we-bg-white we-border-bottom-1 we-relative home-tab">
    <!-- <span>导航栏</span> -->
    <div class="we-flex we-scroll-x tab-wrapper" ref="tabWrapper">
      <template v-for="(item, index) in routeList">
        <div class="we-border-right-1 we-font-center tab-box" :class="{'active': currentRoute == item.name}" ref="tabBox"
          :key="index" @click="toPage(item)">
          <div class="tab-title">
            <p class="we-line-1">{{item.meta.title}}</p>
          </div>
          <img class="close" src="@img/icon_close.png" alt="" @click="onClose(item)" v-if="routeList.length > 1">
        </div>
      </template>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      
    }
  },

  computed: {
    ...mapGetters(['routeList', 'routeInclude', 'currentRoute', 'lastRoute'])
  },
  created() {
    console.log(this.routeList)
  },
  methods: {
    // 关闭页面
    onClose(item) {
      console.log(item)
      // this.routerReplace({
      //   name: item.name
      // })
    },

    //  跳转页面
    toPage(item) {
      this.routerPush({
        name: item.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./home-tab.scss";
</style>
