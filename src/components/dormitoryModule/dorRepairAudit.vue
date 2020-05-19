<template>
  <div class="add-box">
    <el-form ref="formName" :rules="rules" :model="dataInfo" label-position="left" label-width="100px" class="we-flex-wrap we-padding">
      <el-form-item label="维修内容" prop="content" class="we-width-100pc">
        <p>{{dataInfo.content}}</p>
      </el-form-item>
      <el-form-item label="图片" class="we-width-100pc" v-if="dataInfo.imgList.length">
        <my-show-img v-model="dataInfo.imgList" noDelete />
      </el-form-item>

      <el-form-item label="审核" prop="status" class="we-width-300 we-margin-right-20">
        <el-radio v-model="dataInfo.status" :label="2">通过</el-radio>
        <el-radio v-model="dataInfo.status" :label="0">不通过</el-radio>
      </el-form-item>
      <el-form-item label="回复内容" prop="replyContent" class="we-width-100pc">
        <el-input v-model="dataInfo.replyContent" placeholder="请输入回复内容" type="textarea" rows="2" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注说明" prop="remark" class="we-width-100pc">
        <el-input v-model="dataInfo.remark" placeholder="请输入备注说明" type="textarea" rows="2" clearable></el-input>
      </el-form-item>
    </el-form>
    <div class="we-border-top-1 we-padding we-bg-white">
      <el-button type="primary" @click="onConfirm" :disabled="!dataInfo.id">提交</el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      dataInfo: {
        id: null,
        content: '',
        imgList: [],
        status: null,
        replyContent: '',
        remark: ''
      },
      rules: {
        status: [
          { required: true, message: '请选择审核状态', trigger: 'change' }
        ],
      },
    }
  },
  created() {
    if (this.editData && this.editData.id) {
      this.dataInfo.id = this.editData.id
      this.dataInfo.content = this.editData.content
      if (this._.isArray(this.editData.imgList) && this.editData.imgList.length) {
        this.dataInfo.imgList = this.editData.imgList
      }
    }
  },

  methods: {
    // 提交
    onConfirm() {
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
      let res = await this.$http.post('/doraffair/repair/edit', params)
      if (res.errorCode === 0) {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        this.$emit('confirm')
      }
    },

    // 取消
    onCancel() {
      this.$emit('cancel')
    },

  },

  watch: {
    editData: {
      handler(val, oldVal) {
        if (val === oldVal) return
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.add-box {
  width: 680px;
}
</style>
