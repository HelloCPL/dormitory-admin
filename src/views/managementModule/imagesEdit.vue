<template>
  <div class="we-flex-column we-width-100pc we-height-100pc">
    <div class="we-flex-1 we-scroll-y we-padding">
      <el-form ref="formName" :rules="rules" :model="dataInfo" label-position="top" label-width="80px" class="we-flex-wrap form-wrapper">
        <!-- 图片 -->
        <el-row class="we-width-100pc">
          <el-form-item label="图片" prop="url">
            <my-upload-img @confirm="onConfirmImg" />
            <my-show-img v-model="urlImg" class="we-margin-top-10" />
          </el-form-item>
        </el-row>
        <el-form-item label="类型" prop="type" class="we-width-220 we-margin-right-20">
          <el-select v-model="dataInfo.type" clearable placeholder="请选择">
            <el-option v-for="item in filterData.typeList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始展示时间" prop="startTime" class="we-width-220 we-margin-right-20">
          <el-date-picker v-model="dataInfo.startTime" type="datetime" placeholder="选择开始展示时间" format="yyyy-MM-dd HH:mm"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束展示时间" prop="endTime" class="we-width-220 we-margin-right-20">
          <el-date-picker v-model="dataInfo.endTime" type="datetime" placeholder="选择结束展示时间" format="yyyy-MM-dd HH:mm"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否公开" prop="isPublic" class="we-width-220 we-margin-right-20">
          <el-select v-model="dataInfo.isPublic" clearable placeholder="请选择">
            <el-option v-for="item in filterData.publicList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否置顶" prop="isTop" class="we-width-220 we-margin-right-20">
          <el-select v-model="dataInfo.isTop" clearable placeholder="请选择">
            <el-option v-for="item in filterData.topList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort" class="we-width-220 we-margin-right-20">
          <el-input v-model="dataInfo.sort" placeholder="请输入排序" type="number" clearable></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="desc" class="we-margin-right-20 full-box">
          <el-input v-model="dataInfo.desc" placeholder="请输入简介" clearable></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="remark" class="we-margin-right-20 full-box">
          <el-input v-model="dataInfo.remark" type="textarea" placeholder="请输入说明" clearable></el-input>
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
import config from '@/config/config'
export default {
  name: 'imagesEdit',
  data() {
    // 自定义校验开始时间
    var checkStartTime = (rule, value, callback) => {
      if (value && this.dataInfo && this.dataInfo.endTime && value >= this.dataInfo.endTime) {
        callback('开始时间必须小于结束时间')
      } else {
        callback()
      }
    }

    // 自定义校验结束时间
    var checkEndTime = (rule, value, callback) => {
      if (value && this.dataInfo && this.dataInfo.startTime && value <= this.dataInfo.startTime) {
        callback('结束时间必须大于开始时间')
      } else {
        callback()
      }
    }

    return {
      baseUrl: config.baseUrl + '/file/upload',
      dataInfo: {
        id: null,
        type: null,
        startTime: null,
        endTime: null,
        isPublic: null,
        isTop: null,
        sort: 1,
        url: null,
        desc: '',
        remark: ''
      },
      rules: {
        url: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请输入标题', trigger: 'change' }
        ],
        startTime: [
          { required: true, message: '请选择开始展示时间', trigger: 'change' },
          { validator: checkStartTime, trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择结束展示时间', trigger: 'change' },
          { validator: checkEndTime, trigger: 'change' }
        ],
        isPublic: [
          { required: true, message: '请选择是否公开', trigger: 'change' }
        ],
        isTop: [
          { required: true, message: '请选择是否置顶', trigger: 'change' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'change' }
        ],
      },
      filterData: {
        publicList: [{ id: 1, name: '公开' }, { id: 0, name: '不公开' }],
        topList: [{ id: 1, name: '置顶' }, { id: 0, name: '不置顶' }],
        typeList: [{ id: 1, name: '轮播图' }, { id: 2, name: '宿舍相关信息图' }, { id: 3, name: '优秀宿舍图展' }, { id: 4, name: '其他' }]
      },
      urlImg: null
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
        let res = await this.$http.post('/management/images/detail', { id })
        if (res.errorCode === 0) {
          for (let key in this.dataInfo) {
            this.dataInfo[key] = res.data[key]
          }
          if (res.data.url && res.data.url.shortName)
            this.urlImg = res.data.url
        }
      } else if (flag) {
        Object.assign(this.$data, this.$options.data())
      }
    },

    // 图片上传返回
    onConfirmImg(obj) {
      this.urlImg = obj
    },

    // 确定
    onSubmit() {
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
      if (this.urlImg && this.urlImg.shortName) {
        this.dataInfo.url = this.urlImg.shortName
      } else {
        this.dataInfo.url = ''
      }
      let res = await this.$http.post('/management/images/add', this.dataInfo)
      if (res.errorCode === 0) {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        this.routerBack()
      }
    },

    // 编辑
    async onEdit() {
      if (this.urlImg && this.urlImg.shortName) {
        this.dataInfo.url = this.urlImg.shortName
      } else {
        this.dataInfo.url = ''
      }
      let res = await this.$http.post('/management/images/edit', this.dataInfo)
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
  },
  watch: {
    urlImg: {
      handler(val, oldVal) {
        if (val === oldVal) return
        if (val && val.shortName) {
          this.dataInfo.url = val.shortName
        } else {
          this.dataInfo.url = ''
        }
        this.$refs.formName.validateField('url', valid => { })
      },
      deep: true
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
