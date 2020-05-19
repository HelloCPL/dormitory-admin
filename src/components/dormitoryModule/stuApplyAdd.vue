<template>
  <div class="add-box">
    <el-form ref="formName" :rules="rules" :model="dataInfo" label-position="left" label-width="100px" class="we-flex-wrap we-padding">
      <el-form-item label="申请内容" prop="content" class="we-width-100pc">
        <el-input v-model="dataInfo.content" type="textarea" placeholder="请输入申请内容" disabled clearable></el-input>
      </el-form-item>
      <el-form-item label="申请原因" prop="reason" class="we-width-100pc">
        <el-input v-model="dataInfo.reason" type="textarea" placeholder="请输入申请原因" disabled clearable></el-input>
      </el-form-item>
      <el-form-item label="申请开始时间" prop="startTime" class="we-width-300 we-margin-right-20">
        <el-date-picker v-model="dataInfo.startTime" disabled type="datetime" placeholder="选择开始展示时间" format="yyyy-MM-dd"
          value-format="timestamp">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="申请结束时间" prop="endTime" class="we-width-300 we-margin-right-20">
        <el-date-picker v-model="dataInfo.endTime" disabled type="datetime" placeholder="选择开始展示时间" format="yyyy-MM-dd"
          value-format="timestamp">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="审核" prop="replyStatus" class="we-width-300 we-margin-right-20">
        <el-radio v-model="dataInfo.replyStatus" :label="2">通过</el-radio>
        <el-radio v-model="dataInfo.replyStatus" :label="0">不通过</el-radio>
      </el-form-item>
      <el-form-item label="回复内容" prop="replyContent" class="we-width-100pc">
        <el-input v-model="dataInfo.replyContent" placeholder="请输入回复内容" type="textarea" rows="3" clearable></el-input>
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
        reason: '',
        startTime: '',
        endTime: '',
        replyStatus: null,
        replyContent: ''
      },
      rules: {
        replyStatus: [
          { required: true, message: '请选择审核状态', trigger: 'change' }
        ],
      },
    }
  },
  created() {
    if (this.editData && this.editData.id) {
      this.dataInfo.id = this.editData.id
      this.dataInfo.content = this.editData.content
      this.dataInfo.reason = this.editData.reason
      this.dataInfo.startTime = this.editData.startTime
      this.dataInfo.endTime = this.editData.endTime
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
        replyStatus: this.dataInfo.replyStatus,
        replyContent: this.dataInfo.replyContent,
      }
      let res = await this.$http.post('/dorstudent/apply/edit', params)
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
        if(val === oldVal) return
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
