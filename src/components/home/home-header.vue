<template>
  <div class="we-color-white home-header">
    <!-- 背景图片 -->
    <!-- <div class="header-bg">
      <img src="@img/icon_home_bg.png" alt="">
    </div> -->
    <!-- 头部信息 -->
    <div class="we-flex-jc-ai header-box">
      <div class="we-flex-ai">
        <img src="@img/icon_user_white.png" alt="" class="left-icon">
        <span class="we-font-20 we-padding-left-20">广东技术师范大学</span>
      </div>
      <div class="we-flex-ai right">
        <img src="@img/avatar.png" alt="" class="right-icon">
        <span class="we-font-14 we-padding-left-10 we-pointer">梁婉鸣</span>
        <span class="we-font-14 we-padding-left-10 we-pointer" @click="toExit">退出</span>
      </div>
    </div>
    <!-- 主体导航 -->
    <div class="we-flex-ai main-nav" :class="{'main-nav-active': !show}">
      <template v-for="(item, index) in menus">
        <div class="nav-item" :key="index">
          <span class="we-pointer" :class="{'active': item.selected}" @click="homeMenuClick(item)">{{item.name}}</span>
        </div>
      </template>
    </div>

    <!-- 收起或展开 -->
    <img src="@img/icon_arrow_white.png" :title="show ? '收起' : '展开'" class="we-pointer icon_arrow" :class="{'icon_arrow_active': !show}"
      @click="show = !show" />

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      show: true, // 是否展示
    }
  },
  computed: {
    ...mapGetters(['menus', 'homeMenuId'])
  },
  methods: {
    ...mapActions(['setHomeMenuId', 'changeMenus', 'setCurrentMenu', 'resetMenusInfo', 'resetUserInfo']),

    // 点击菜单
    homeMenuClick(item) {
      if (this.homeMenuId === item.menuId) return
      this.setHomeMenuId(item.menuId)
      this.changeMenus(item.menuId)
      this.setCurrentMenu(item)
      this.$emit('clickMenu', item)
    },

    // 退出系统
    toExit() {
      this.$confirm('是否退出当前系统？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 先删除vuex
        this.resetMenusInfo()
        this.resetUserInfo()
        // // 再删除sessionStorage
        sessionStorage.clear()
        // 刷新页面
        location.reload()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },

  }
}
</script>

<style lang="scss" scoped>
@import "./home-header.scss";
</style>
