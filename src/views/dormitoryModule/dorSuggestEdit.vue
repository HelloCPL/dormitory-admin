<template>
  <div class="we-flex-column we-width-100pc we-height-100pc">
    <div class="we-flex-1 we-scroll-y we-padding">
      <el-form ref="formName" :rules="rules" :model="dataInfo" label-position="top" label-width="80px" class="we-flex-wrap form-wrapper">
        <el-form-item label="审核" prop="status" class="full-box we-margin-right-20">
          <el-radio v-model="dataInfo.status" :label="2">通过</el-radio>
          <el-radio v-model="dataInfo.status" :label="0">不通过</el-radio>
        </el-form-item>
        <el-form-item label="回复内容" prop="replyContent" class="full-box we-margin-right-20">
          <el-input v-model="dataInfo.replyContent" placeholder="请输入回复内容" type="textarea" rows="3" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注说明" prop="remark" class="full-box we-margin-right-20">
          <el-input v-model="dataInfo.remark" placeholder="请输入备注说明" type="textarea" rows="3" clearable></el-input>
        </el-form-item>
        <el-form-item :label="dataInfo.type == 1 ? '投诉时间' : '建议时间'" prop="createTime" class="we-width-220 we-margin-right-20">
          <el-date-picker v-model="dataInfo.createTime" disabled type="datetime" placeholder="选择时间" format="yyyy-MM-dd HH:mm"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="dataInfo.type == 1 ? '投诉内容' : '建议内容'" prop="content" class="we-margin-right-20 full-box">
          <el-input v-model="dataInfo.content" type="textarea" disabled placeholder="请输入" clearable></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-row class="we-width-100pc">
          <el-form-item label="图片" prop="imgList">
            <my-show-img v-model="dataInfo.imgList" noDelete class="we-margin-top-10" />
          </el-form-item>
        </el-row>

      </el-form>
    </div>
    <!-- 确定按钮 -->
    <div class="we-width-100pc we-border-top-1 we-padding">
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dorSuggestEdit',
  data() {

    return {
      dataInfo: {
        id: null,
        status: null,
        replyContent: '',
        remark: '',
        type: 1,
        content: '',
        createTime: null,
        imgList: [],
      },
      rules: {
        status: [
          { required: true, message: '请选择审核状态', trigger: 'change' }
        ],
      },
    }
  },
  created() {
    this.initData()
  },
  activated() {
    this.initData(true)
  },
  methods: {
    // 初始化判断是编辑还是新增
    async initData(flag) {
      let id = this.$route.params.id
      if (id) {
        let res = await this.$http.post('/doraffair/suggestion/detail', { id })
        if (res.errorCode === 0) {
          this.dataInfo.id = res.data.id
          this.dataInfo.type = res.data.type
          this.dataInfo.content = res.data.content
          this.dataInfo.createTime = res.data.createTime
          this.dataInfo.imgList = res.data.imgList
        }
      } else if (flag) {
        Object.assign(this.$data, this.$options.data())
      }
    },



    // 确定
    onSubmit() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          if (this.dataInfo.id) {
            this.onEdit()
          }
        } else {
          this.$message('请输入必填项')
          return false
        }
      });
    },

    // 编辑
    async onEdit() {
      let params = {
        id: this.dataInfo.id,
        status: this.dataInfo.status,
        replyContent: this.dataInfo.replyContent,
        remark: this.dataInfo.remark,
      }
      console.log(params)
      let res = await this.$http.post('/doraffair/suggestion/edit', params)
      if (res.errorCode === 0) {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        this.routerBack()
      }
    },

    // 取消
    onCancel() {
      this.routerBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  max-width: 960px;
}

.full-box {
  width: 100%;
  max-width: 940px;
}
</style>
