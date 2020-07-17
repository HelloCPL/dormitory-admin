<template>
  <div class="we-flex-column we-width-100pc we-height-100pc">
    <div class="we-flex-1 we-scroll-y we-padding">
      <el-form ref="formName" :rules="rules" :model="dataInfo" label-position="top" label-width="80px" class="we-flex-wrap form-wrapper">
        <el-form-item label="标题" prop="title" class="we-margin-right-20 full-box">
          <el-input v-model="dataInfo.title" placeholder="请输入标题" clearable></el-input>
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
        <el-form-item label="检查类型" prop="type" class="we-width-220 we-margin-right-20">
          <el-select v-model="dataInfo.type" clearable placeholder="请选择">
            <el-option v-for="item in filterData.typeList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检查时间" prop="checkTime" class="we-width-220 we-margin-right-20">
          <el-date-picker v-model="dataInfo.checkTime" type="datetime" placeholder="选择检查时间" format="yyyy-MM-dd HH:mm"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="检查开始时间" prop="startTime" class="we-width-220 we-margin-right-20">
          <el-date-picker v-model="dataInfo.startTime" type="datetime" placeholder="选择检查开始时间" format="yyyy-MM-dd"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="检查结束时间" prop="endTime" class="we-width-220 we-margin-right-20">
          <el-date-picker v-model="dataInfo.endTime" type="datetime" placeholder="选择检查结束时间" format="yyyy-MM-dd"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="评价等级" prop="scope" class="we-width-220 we-margin-right-20">
          <el-select v-model="dataInfo.scope" clearable placeholder="请选择">
            <el-option v-for="item in filterData.scopeList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检查内容" prop="content" class="we-margin-right-20 full-box">
          <el-input v-model="dataInfo.content" type="textarea" placeholder="请输入检查内容" clearable></el-input>
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
  name: 'dorCheckAdd',
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
        dorBuildingId: null,
        dorRoomId: null,
        type: '',
        checkTime: null,
        startTime: null,
        endTime: null,
        scope: null,
        content: '',
        remark: ''

      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        dorBuildingId: [
          { required: true, message: '请选择所属宿舍栋', trigger: 'change' }
        ],
        dorRoomId: [
          { required: true, message: '请选择宿舍房间', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择检查类型', trigger: 'change' }
        ],
        checkTime: [
          { required: true, message: '请选择检查时间', trigger: 'change' }
        ],
        startTime: [
          { required: true, message: '请选择检查开始时间', trigger: 'change' },
          { validator: checkStartTime, trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择检查结束时间', trigger: 'change' },
          { validator: checkEndTime, trigger: 'blur' }
        ],
        scope: [
          { required: true, message: '请选择评价等级', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入检查内容', trigger: 'blur' }
        ],
      },
      filterData: {
        dorBuildingList: [], // 宿舍栋列表
        dorRoomList: [], // 宿舍栋列表
        typeList: [{ id: 1, name: '评优' }, { id: 2, name: '违纪' }, { id: 3, name: '卫生检查' }],
        scopeList: [{ id: 1, name: '非常差' }, { id: 2, name: '差' }, { id: 3, name: '合格' }, { id: 4, name: '良好' }, { id: 5, name: '优秀' }]
      },
      loading: false,
    }
  },
  created() {
    this.filterMethodBuilding()
  },
  activated() {
    Object.assign(this.$data, this.$options.data())
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
      this.$refs.formName.validate((valid) => {
        if (valid) {
          this.onAdd()
        } else {
          this.$message('请输入必填项')
          return false
        }
      });
    },

    // 新增
    async onAdd() {
      let res = await this.$http.post('/doraffair/check/add', this.dataInfo)
      if (res.errorCode === 0) {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        this.onCancel()
      }
    },

    // 取消
    onCancel() {
      this.tabdeleteMethods({ to: 'dorCheckAdd' , target: 'dorCheck'})
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