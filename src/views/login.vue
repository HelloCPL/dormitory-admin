<template>
  <div class="login-container">
    <div class="we-bg-white wrapper">
      <el-form label-position="top" label-width="80px" :model="formLabelAlign" :rules="rules" ref="ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formLabelAlign.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" class="we-width-100pc" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { menus } from '@js/menus'
export default {
  name: 'login',
  data() {
    return {
      formLabelAlign: {
        username: '',
        password: '', // 密码
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'change' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
        ],
      },
      count: 14,
    }
  },
  methods: {
    ...mapActions(['setIsAuth', 'setUserInfo', 'setHomeMenuId', 'setMenus']),

    // 提交
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let params = {
            username: this.formLabelAlign.username,
            password: this.$md5(this.formLabelAlign.password + this.$config.salt)
          }
          let res = await this.$http.post('/login', params)
          if (res.errorCode === 0) {
            this.setUserInfo(res.data)
            // 本地缓存
            let userInfo = JSON.stringify(res.data)
            sessionStorage.setItem('userInfo', userInfo)
            // 获取 token
            let res2 = await this.$http.post('/token/generate', { id: res.data.id })
            if (res2.errorCode === 0) {
              // 处理菜单
              let homeMenuId = sessionStorage.getItem('homeMenuId')
              if (homeMenuId) {
                this.setHomeMenuId(homeMenuId)
                this.handlerMenus(menus, homeMenuId)
              } else {
                homeMenuId = menus[0]['menuId']
                this.setHomeMenuId(homeMenuId)
                this.handlerMenus(menus, homeMenuId)
              }

              this.$message({
                type: 'success',
                message: '登录成功'
              })
              this.setIsAuth(res2.data)
              sessionStorage.setItem('isAuth', res2.data)
              this.$router.push({
                name: 'welcome'
              })
            }
          }
        } else {
          this.$message({
            message: '请输入必填项',
            type: 'error',
            showClose: true
          })
          return false;
        }
      });
    },

    // 处理当前选中菜单
    handlerMenus(menus, homeMenuId) {
      let flag = false
      menus.forEach(item => {
        if (item.menuId === homeMenuId) {
          item.selected = true
          flag = true
        } else {
          item.selected = false
        }
      })
      if (!flag) menus[0]['selected'] = true
      this.setMenus(menus)
      sessionStorage.setItem('menus', JSON.stringify(menus))
    },

  }
}
</script>

<style lang="scss" scoped>
@import "./login.scss";
</style>