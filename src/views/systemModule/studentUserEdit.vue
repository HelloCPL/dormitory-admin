<template>
  <div class="we-flex-column we-width-100pc we-height-100pc">
    <div class="we-flex-1 we-scroll-y we-padding">
      <el-form ref="formName" :rules="rules" :model="dataInfo" label-position="top" label-width="80px" class="student-user-wrapper">
        <!-- 照片 姓名 性别 电话 学号 专业 学校 -->
        <div class="we-flex-jc">
          <div class="we-flex-1 we-flex-wrap">
            <el-form-item label="姓名" prop="name" class="we-width-220 we-margin-right-20">
              <el-input v-model="dataInfo.name" placeholder="请输入姓名" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex" class="we-width-220 we-margin-right-20">
              <el-select v-model="dataInfo.sex" clearable placeholder="请选择性别">
                <el-option v-for="item in filtersDataList.sexList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电话" prop="phone" class="we-width-220 we-margin-right-20">
              <el-input v-model="dataInfo.phone" placeholder="请输入电话" clearable></el-input>
            </el-form-item>
            <el-form-item label="学号" prop="studentNum" class="we-width-220 we-margin-right-20">
              <el-input v-model="dataInfo.studentNum" placeholder="请输入学号" clearable></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="major" class="we-width-220 we-margin-right-20">
              <el-input v-model="dataInfo.major" placeholder="请输入专业" clearable></el-input>
            </el-form-item>
            <el-form-item label="学校" prop="school" class="we-width-220 we-margin-right-20">
              <el-input v-model="dataInfo.school" disabled placeholder="请输入学校" clearable></el-input>
            </el-form-item>
            <el-form-item label="所属宿舍栋" prop="dorBuildingId" class="we-width-220 we-margin-right-20">
              <el-select v-model="dataInfo.dorBuildingId" filterable remote clearable placeholder="请输入选择" :loading="loading"
                :filter-method="filterMethodBuilding" @change="onChange">
                <el-option v-for="item in filtersDataList.dorBuildingList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="房间名称" prop="dorRoomId" class="we-width-220 we-margin-right-20">
              <el-select v-model="dataInfo.dorRoomId" filterable remote clearable placeholder="请输入选择" :loading="loading"
                :filter-method="filterMethodRoom">
                <el-option v-for="item in filtersDataList.dorRoomList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入学时间" prop="admissionTime" class="we-width-220 we-margin-right-20">
              <el-date-picker v-model="dataInfo.admissionTime" type="date" placeholder="选择入学时间" format="yyyy年MM月dd日"
                value-format="timestamp">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="毕业时间" prop="graduationTime" class="we-width-220 we-margin-right-20">
              <el-date-picker v-model="dataInfo.graduationTime" type="date" placeholder="选择毕业时间" format="yyyy年MM月dd日"
                value-format="timestamp">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="微信号" prop="wechat" class="we-width-220 we-margin-right-20">
              <el-input v-model="dataInfo.wechat" placeholder="请输入微信号" clearable></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" class="we-width-220 we-margin-right-20">
              <el-input v-model="dataInfo.email" placeholder="请输入邮箱" clearable></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday" class="we-width-220 we-margin-right-20">
              <el-date-picker v-model="dataInfo.birthday" type="date" placeholder="选择生日时间" format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="家庭住址" prop="address" class="we-width-460 we-margin-right-20">
              <el-input v-model="dataInfo.address" placeholder="请输入家庭住址" clearable></el-input>
            </el-form-item>
          </div>
          <div class="we-width-200 we-relative">
            <div class="avatar-box">
              <el-upload class="we-pointer we-bg avatar-uploader" :action="baseUrl" :multiple="false" :show-file-list="false"
                accept="image/*" :on-success="handleAvatarSuccess">
                <img v-if="userAvatarList" :src="userAvatarList.fullName" class="avatar-img">
                <div v-if="!userAvatarList">
                  <i class="we-font-20 el-icon-plus"></i>
                  <p class="we-font-14 we-color-tip we-margin-top-10">上传头像</p>
                </div>
              </el-upload>
            </div>
          </div>
        </div>
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
  name: 'studentUserEdit',
  inject: ['newTab', 'tabdeleteMethods'],
  data() {
    // 自定义校验电话格式
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }

    // 自定义校验邮箱格式
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      setTimeout(() => {
        if (mailReg.test(value) || !value) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }

    return {
      baseUrl: config.baseUrl + '/file/upload',
      loading: false,
      userAvatarList: null,
      dataInfo: {
        id: null,
        name: '',
        sex: '',
        phone: '',
        studentNum: '',
        major: '',
        school: '广东技术师范大学',
        dorBuildingId: null,
        dorRoomId: null,
        admissionTime: null,
        graduationTime: null,
        wechat: '',
        email: '',
        birthday: '',
        address: '',
        headImg: null


      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'change' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        studentNum: [
          { required: true, message: '请输入学号', trigger: 'change' }
        ],
        major: [
          { required: true, message: '请输入专业', trigger: 'change' }
        ],
        school: [
          { required: true, message: '请输入学校', trigger: 'change' }
        ],
        dorBuildingId: [
          { required: true, message: '请选择所属宿舍栋', trigger: 'change' }
        ],
        dorRoomId: [
          { required: true, message: '请选择宿舍房间', trigger: 'change' }
        ],
        admissionTime: [
          { required: true, message: '请选择入学时间', trigger: 'change' }
        ],
        graduationTime: [
          { required: true, message: '请选择毕业时间', trigger: 'change' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],

      },
      filtersDataList: { // 筛选条件
        sexList: [{
          id: '男',
          name: '男'
        },
        {
          id: '女',
          name: '女'
        }],
        dorBuildingList: [], // 宿舍栋列表
        dorRoomList: [], // 宿舍栋列表
      }
    }
  },
  created() {
    this.initData()
    this.filterMethodBuilding()
  },
  activated() {
    this.initData(true)
    this.filterMethodBuilding()
  },
  methods: {
    // 初始化判断是编辑还是新增
    async initData(flag) {
      let id = this.$route.params.id
      if (id) {
        let res = await this.$http.post('/student/info/detail', { id })
        if (res.errorCode === 0) {
          for (let key in this.dataInfo) {
            this.dataInfo[key] = res.data[key]
          }
          if (res.data.headImg && res.data.headImg.shortName)
            this.userAvatarList = res.data.headImg
        }
      } else if(flag) {
        Object.assign(this.$data, this.$options.data())
      }
    },
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
        this.filtersDataList.dorBuildingList = res.data || []
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
        this.filtersDataList.dorRoomList = res.data || []
      this.loading = false
    },

    // 头像上传成功
    handleAvatarSuccess(res) {
      if (res.errorCode === 0 && this._.isObject(res.data))
        this.userAvatarList = res.data
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
      if (this.userAvatarList && this.userAvatarList.shortName) {
        this.dataInfo.headImg = this.userAvatarList.shortName
      } else {
        this.dataInfo.headImg = ''
      }
      let res = await this.$http.post('/student/info/add', this.dataInfo)
      if (res.errorCode === 0) {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        this.onCancel()
      }
    },

    // 编辑
    async onEdit() {
      if (this.userAvatarList && this.userAvatarList.shortName) {
        this.dataInfo.headImg = this.userAvatarList.shortName
      } else {
        this.dataInfo.headImg = ''
      }
      let res = await this.$http.post('/student/info/edit', this.dataInfo)
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
      this.tabdeleteMethods({ to: 'studentUserEdit' })
    }
  }
}
</script>

<style lang="scss" scoped>
.student-user-wrapper {
  max-width: 960px;

  .avatar-box {
    border: 1px dashed #d9d9d9;
    border-radius: 2px;
    overflow: hidden;
    position: absolute;
    top: 10px;
    right: 0;
    width: 180px;
    height: 230px;
  }

  .avatar-uploader {
    width: 100%;
    height: 100%;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;

    .avatar-img {
      width: 100%;
    }
  }
}
</style>


