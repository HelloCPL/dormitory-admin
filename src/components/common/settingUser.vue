<template>
  <div class="setting-user-container">
    <div class="user-avatar">
      <img :src="userInfo.headImg.fullName" alt="" v-if="userInfo.headImg && userInfo.headImg.fullName">
      <img src="@img/avatar.png" alt="" v-else>
    </div>
    <div class="we-margin-top-5 user-name-sex">
      <span>{{userInfo.name}}</span>
      <img src="@img/icon_man.png" alt="" v-if="userInfo.sex == '男'">
      <img src="@img/icon_woman.png" alt="" v-if="userInfo.sex == '女'">
    </div>
    <p class="we-margin-top-5 we-font-center">{{userInfo.phone}}</p>
    <p class="we-margin-top-5 we-font-center">职位：{{userInfo.position}}</p>
    <!-- 退出按钮 -->
    <div class=" exit-box">
      <el-button @click="onExit" class="exit-btn">退出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userInfo'],
  methods: {
    // 退出
    onExit() {
      this.$emit('exitSystem')
    },
  },
}
</script>

<style lang="scss" scoped>
@import "./settingUser.scss";
</style>
