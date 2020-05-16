<template>
  <div class="we-width-500">
    <el-form ref="formName" :rules="rules" :model="dataInfo" label-position="left" label-width="80px" class="we-padding">
      <el-form-item label="宿舍名称" prop="name" class="we-width-300">
        <el-input v-model="dataInfo.name" placeholder="请输入宿舍名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="宿舍简介" prop="desc" class="we-width-100pc">
        <el-input v-model="dataInfo.desc" placeholder="请输入宿舍简介" type="textarea" rows="3" clearable></el-input>
      </el-form-item>
    </el-form>
    <div class="we-border-top-1 we-padding we-bg-white">
      <el-button type="primary" @click="onConfirm">提交</el-button>
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
        name: '',
        desc: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'change' }
        ],
      }
    }
  },
  created() {
    if (this.editData && this.editData.id) {
      this.dataInfo.id = this.editData.id
      this.dataInfo.name = this.editData.name
      this.dataInfo.desc = this.editData.desc
    }
  },
  methods: {
    // 提交
    onConfirm() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          if (this.dataInfo.id) {
            this.onEdit()
          } else {
            this.onAdd()
          }
        } else {
          this.$message('请输入必填项')
          return false;
        }
      });
    },

    // 新增
    async onAdd() {
      let res = await this.$http.post('/dorbuilding/add', this.dataInfo)
      if (res.errorCode === 0) {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        this.$emit('confirm')
      }

    },

    // 编辑
    async onEdit() {
      let res = await this.$http.post('/dorbuilding/edit', this.dataInfo)
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
    }
  }
}
</script>

