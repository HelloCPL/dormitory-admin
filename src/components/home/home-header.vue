<template>
  <div class="we-color-white home-header">
    <!-- 头部信息 -->
    <div class="we-flex-jc-ai header-box">
      <div class="we-flex-ai">
        <!-- <img src="@img/icon_user_white.png" alt="" class="left-icon"> -->
        <span class="we-font-20">后台管理</span>
      </div>
      <div class="we-flex-ai right">
        <img :src="userInfo.headImg.fullName" alt="" class="we-font-14 right-icon" v-if="userInfo.headImg && userInfo.headImg.fullName">
        <img src="@img/avatar.png" alt="" class="we-font-14 right-icon" v-else>
        <span class="we-padding-left-10">{{userInfo.name}}</span>
        <span class="we-padding-left-10 we-pointer" @click="toSetting">设置</span>
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
import createComponent from '@js/createComponent'
import setting from '../common/setting'
export default {
  data() {
    return {
      active: 0,
      show: true, // 是否展示
      showSetting: false, // 是否显示设置页面
    }
  },
  computed: {
    ...mapGetters(['menus', 'homeMenuId', 'userInfo'])
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

    // 跳转到设置页面
    toSetting() {
      let comp = createComponent({
        name: 'setting',
        component: setting,
        props: {
          userInfo: this.userInfo
        },
        single: true
      })
      comp.start()
      comp.$on('removeComponent', () => {
        comp.remove()
      })
      comp.$on('exitSystem', () => {
        this.toExit()
      })
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
