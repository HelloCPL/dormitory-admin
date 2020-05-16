<template>
  <div class="we-flex we-width-100pc we-height-100pc we-relative">
    <!-- 左侧导航栏 -->
    <home-leftside />
    <div class="we-flex-1 we-width-100pc we-height-100pc we-relative wrapper">
      <!-- 中间内容区 -->
      <div class="we-border-1 we-width-100pc we-height-100pc we-flex-column box">
        <!-- 中间导航栏 -->
        <div>
          <home-tab />
        </div>
        <!-- 主题内容入口 -->
        <div class="we-flex-1 we-scroll-y we-bg-white we-width-100pc we-height-100pc content">
          <keep-alive :include="routeInclude">
            <router-view />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import homeLeftside from '@com/home/home-leftside'
import homeTab from '@com/home/home-tab'
export default {
  name: 'dormitoryModule',
  components: {
    homeLeftside,
    homeTab
  },
  computed: {
    ...mapGetters(['routeInclude'])
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
