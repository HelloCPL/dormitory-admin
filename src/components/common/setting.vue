<!-- 
  设置
  字体大小 主题颜色 个人信息 退出
  其他
  登录地图 首页声明 备案与使用 https
-->

<template>
  <div class="setting-container" v-if="flag">
    <div class="setting-content">
      <!-- 头部 -->
      <div class="we-width-100pc header">
        <div class="we-font-16 we-color-white we-bg-blue header-setting-word">设置</div>
        <img src="@img/icon_close.png" alt="" class="we-pointer header-close" @click="onEnd">
      </div>
      <!-- 主题内容区 -->
      <div class="wrapper">
        <div class="wrapper-left">
          <div v-for="(item, index) in dataList" :key="index" class="we-pointer wrapper-left-word" :class="{'wrapper-left-active': item.active === active}"
            @click="active = item.active">{{item.text}}</div>
        </div>
        <div class="we-bg wrapper-right">
          <setting-user :userInfo="userInfo" @exitSystem="onExit" v-if="active == 0"></setting-user>
          <setting-font-size v-if="active == 1"></setting-font-size>
          <span v-if="active == 2">2</span>
          <span v-if="active == 3">3</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import settingUser from './settingUser'
import settingFontSize from './settingFontSize'
export default {
  components: {
    settingUser,
    settingFontSize
  },
  data() {
    return {
      flag: false,
      active: 0,
      dataList: [
        { active: 0, text: '个人信息' },
        { active: 1, text: '字体大小', },
        { active: 2, text: '主题颜色' },
        { active: 3, text: '关于我们' },
      ]
    }
  },
  props: ['userInfo'],
  methods: {
    // 组件启动
    start() {
      this.flag = true
    },

    // 组件销毁
    onEnd() {
      this.flag = false
      this.$emit('removeComponent')
    },

    // 退出登录
    onExit() {
      this.$emit('exitSystem')
    },
  }
}
</script>

<style lang="scss" scoped>
@import "./setting.scss";
</style>


