<template>
  <div class="we-flex-column we-width-100pc we-height-100pc">
    <div class="we-flex-1 we-scroll-y we-padding">
      <el-form ref="formName" :rules="rules" :model="dataInfo" label-position="top" label-width="80px" class="we-flex-wrap form-wrapper">
        <el-form-item label="缴费标题" prop="title" class="we-margin-right-20 full-box">
          <el-input v-model="dataInfo.title" placeholder="请输入缴费标题" clearable></el-input>
        </el-form-item>
        <el-form-item label="缴费内容" prop="content" class="we-margin-right-20 full-box">
          <el-input v-model="dataInfo.content" type="textarea" placeholder="请输入缴费内容" clearable></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="price" class="we-width-220 we-margin-right-20">
          <el-input v-model="dataInfo.price" type="number" placeholder="请输入金额" clearable></el-input>
        </el-form-item>
        <el-form-item label="缴费开始时间" prop="startTime" class="we-width-220 we-margin-right-20">
          <el-date-picker v-model="dataInfo.startTime" type="datetime" placeholder="选择检查开始时间" format="yyyy-MM-dd"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="缴费结束时间" prop="endTime" class="we-width-220 we-margin-right-20">
          <el-date-picker v-model="dataInfo.endTime" type="datetime" placeholder="选择检查结束时间" format="yyyy-MM-dd"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所属宿舍栋" prop="dorBuildingId" class="we-width-220 we-margin-right-20">
          <el-select v-model="dataInfo.dorBuildingId" filterable remote clearable placeholder="请输入选择" :loading="loading"
            :filter-method="filterMethodBuilding" @change="onChange">
            <el-option v-for="item in filterData.dorBuildingList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间名称" prop="dorRoomId" class="we-width-220 we-margin-right-20">
          <el-select v-model="dataInfo.dorRoomId" filterable remote clearable placeholder="请输入选择" :loading="loading"
            :filter-method="filterMethodRoom">
            <el-option v-for="item in filterData.dorRoomList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注说明" prop="remark" class="we-margin-right-20 full-box">
          <el-input v-model="dataInfo.remark" type="textarea" placeholder="请输入备注说明" clearable></el-input>
        </el-form-item>
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
  name: 'dorPaymentAdd',
  inject: ['newTab', 'tabdeleteMethods'],
  data() {
    // 自定义校验开始时间
    var checkStartTime = (rule, value, callback) => {
      setTimeout(() => {
        if (value && this.dataInfo && this.dataInfo.endTime && value >= this.dataInfo.endTime) {
          callback('开始时间必须小于结束时间')
        } else {
          callback()
        }
      }, 100)
    }

    // 自定义校验结束时间
    var checkEndTime = (rule, value, callback) => {
      setTimeout(() => {
        if (value && this.dataInfo && this.dataInfo.startTime && value <= this.dataInfo.startTime) {
          callback('结束时间必须大于开始时间')
        } else {
          callback()
        }
      }, 100)
    }

    return {
      dataInfo: {
        title: '',
        content: '',
        price: null,
        startTime: null,
        endTime: null,
        dorBuildingId: null,
        dorRoomId: null,
        remark: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入缴费标题', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择检查开始时间', trigger: 'change' },
          { validator: checkStartTime, trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择检查结束时间', trigger: 'change' },
          { validator: checkEndTime, trigger: 'blur' }
        ],
        dorBuildingId: [
          { required: true, message: '请选择所属宿舍栋', trigger: 'change' }
        ],
        dorRoomId: [
          { required: true, message: '请选择宿舍房间', trigger: 'change' }
        ],
      },
      filterData: {
        dorBuildingList: [], // 宿舍栋列表
        dorRoomList: [], // 宿舍栋列表
      },
      loading: false,

    }
  },
  created() {
    this.filterMethodBuilding()
  },
  methods: {
    // 远程获取宿舍栋筛选条件
    async filterMethodBuilding(e) {
      let params = {
        pageNo: 1,
        pageSize: 50,
        keyword: e,
      }
      this.loading = true
      let res = await this.$http.post('/dorbuilding/list', params)
      if (res.errorCode === 0)
        this.filterData.dorBuildingList = res.data || []
      this.loading = false
    },

    // 宿舍栋选择变化
    onChange() {
      this.dataInfo.dorRoomId = ''
      this.filterMethodRoom()
    },

    // 远程获取宿舍房间筛选条件
    async filterMethodRoom(e) {
      let params = {
        pageNo: 1,
        pageSize: 50,
        keyword: e,
        dorBuildingId: this.dataInfo.dorBuildingId
      }
      this.loading = true
      let res = await this.$http.post('/dorroom/list', params)
      if (res.errorCode === 0)
        this.filterData.dorRoomList = res.data || []
      this.loading = false
    },

    // 确定
    onSubmit() {
      this.$refs.formName.validate(async (valid) => {
        if (valid) {
          let res = await this.$http.post('/doraffair/payment/add', this.dataInfo)
          if (res.errorCode === 0) {
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            this.onCancel()
          }
        } else {
          this.$message('请输入必填项')
          return false
        }
      });
    },

    // 取消
    onCancel() {
      this.tabdeleteMethods({ to: 'dorPaymentAdd' , target: 'dorPayment'})
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