<template>
  <div class="we-width-500">
    <el-form ref="formName" :rules="rules" :model="dataInfo" label-position="left" label-width="100px" class="we-padding">
      <el-form-item label="房间名称" prop="name" class="we-width-300">
        <el-input v-model="dataInfo.name" placeholder="请输入房间名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="床位数量" prop="total" class="we-width-300">
        <el-input v-model="dataInfo.total" type="number" placeholder="请输入床位数量" clearable></el-input>
      </el-form-item>
      <el-form-item label="所属宿舍栋" prop="dorBuildingId" class="we-width-300">
        <el-select v-model="dataInfo.dorBuildingId" filterable remote clearable placeholder="请输入选择" :loading="loading"
          :filter-method="filterMethod" @change="onChange" :disabled="isEdit">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="说明" prop="remark" class="we-width-100pc">
        <el-input v-model="dataInfo.remark" placeholder="请输入说明" type="textarea" rows="3" clearable></el-input>
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
        total: null,
        dorBuildingId: null,
        dorBuildingName: '',
        remark: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'change' }
        ],
        total: [
          { required: true, message: '请输入活动名称', trigger: 'change' }
        ],
        dorBuildingId: [
          { required: true, message: '请输入活动名称', trigger: 'change' }
        ],
      },

      isEdit: false,
      options: [],
      loading: false,
    }
  },
  created() {
    this.filterMethod()
    if (this.editData && this.editData.id) {
      this.dataInfo.id = this.editData.id
      this.dataInfo.name = this.editData.name
      this.dataInfo.total = this.editData.total
      this.dataInfo.dorBuildingId = this.editData.dorBuildingId
      this.dataInfo.dorBuildingName = this.editData.dorBuildingName
      this.dataInfo.remark = this.editData.remark
      this.isEdit = true
    }
  },
  activated() {
    this.filterMethod()
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
          return false
        }
      });
    },

    // 新增
    async onAdd() {
      let res = await this.$http.post('/dorroom/add', this.dataInfo)
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
      let res = await this.$http.post('/dorroom/edit', this.dataInfo)
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

    // 远程获取宿舍栋筛选条件
    async filterMethod(e) {
      let params = {
        pageNo: 1,
        pageSize: 50,
        keyword: e
      }
      this.loading = true
      let res = await this.$http.post('/dorbuilding/list', params)
      if (res.errorCode === 0)
        this.options = res.data
      this.loading = false
      this.$forceUpdate()
    },

    // 选择宿舍栋值改变
    onChange(e) {
      let arr = this.options
      this._.find(arr, (item) => {
        if (item.id === e) {
          this.dataInfo.dorBuildingName = item.name
          return
        }
      })
    }
  }
}
</script>

