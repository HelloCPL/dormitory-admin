<template>
  <div class="add-box">
    <el-form ref="formName" :rules="rules" :model="dataInfo" label-position="left" label-width="100px" class="we-flex-wrap we-padding">
      <el-form-item label="维修时间" prop="repairTime" class="we-width-300 we-margin-right-20">
        <el-date-picker v-model="dataInfo.repairTime" type="datetime" placeholder="选择时间" format="yyyy-MM-dd"
          value-format="timestamp">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="维修人" prop="repairWorker" class="we-width-100pc">
        <el-input v-model="dataInfo.repairWorker" placeholder="请输入" clearable></el-input>
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
        status: 3,
        repairTime: '',
        repairWorker: ''
      },
      rules: {

      },
    }
  },
  created() {
    if (this.editData && this.editData.id) {
      this.dataInfo.id = this.editData.id
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
        repairTime: this.dataInfo.repairTime,
        repairWorker: this.dataInfo.repairWorker,
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
