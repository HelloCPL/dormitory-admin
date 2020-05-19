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
      }
    }
  },
  created() {
    console.log(this.$config)
  },
  methods: {
    ...mapActions(['setIsAuth', 'setUserInfo']),

    // 提交
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = {
            username: this.formLabelAlign.username,
            password: this.$md5(this.formLabelAlign.password + this.$config.salt)
          }
          this.$http.post('/login', params)
            .then(res => {
              if (res.errorCode === 0) {
                this.setUserInfo(res.data)
                // 本地缓存
                let userInfo = JSON.stringify(res.data)
                sessionStorage.setItem('userInfo', userInfo)
                // 获取 token
                this.$http.post('/token/generate', { id: res.data.id })
                  .then(res2 => {
                    if (res2.errorCode === 0) {
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
                  })
              }
            })
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
  }
}
</script>

<style lang="scss" scoped>
@import "./login.scss";
</style>