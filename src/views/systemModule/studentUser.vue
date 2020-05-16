<template>
  <div class="we-flex-column we-width-100pc we-height-100pc">
    <!-- 筛选条件 -->
    <student-user-filter @confirm="onConfirmFilter" />
    <!-- 按钮 -->
    <div class="we-width-100pc we-border-bottom-1 we-padding">
      <el-button type="primary" @click="onAdd">增加</el-button>
      <!-- <el-button @click="onDelete">删除</el-button> -->
    </div>
    <!-- 列表渲染 -->
    <div class="we-flex-1 we-scroll-y">
      <el-table stripe :data="dataList" width="100%" height="100%">
        <el-table-column prop="name" label="学生姓名" min-width="80">
        </el-table-column>
        <el-table-column label="照片" width="80">
          <template slot-scope="scope">
            <img :src="scope.row.headImg.fullName" alt="" v-if="scope.row.headImg && scope.row.headImg.fullName" class="student-user-img" />
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" min-width="60">
        </el-table-column>
        <el-table-column prop="phone" label="电话" min-width="120">
        </el-table-column>
        <el-table-column prop="studentNum" label="学号" min-width="150">
        </el-table-column>
        <el-table-column prop="major" label="专业" min-width="150">
        </el-table-column>
        <el-table-column prop="school" label="学校" min-width="150">
        </el-table-column>
        <el-table-column prop="dorBuildingName" label="所属宿舍栋" min-width="120">
        </el-table-column>
        <el-table-column prop="dorRoomName" label="房间" min-width="120">
        </el-table-column>
        <el-table-column label="入学时间" min-width="100">
          <template slot-scope="scope">
            <span>{{scope.row.admissionTime | dateFormat('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="毕业时间" min-width="100">
          <template slot-scope="scope">
            <span>{{scope.row.graduationTime | dateFormat('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="wechat" label="微信号" min-width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="180">
        </el-table-column>
        <el-table-column prop="birthday" label="生日" min-width="100">
        </el-table-column>
        <el-table-column prop="address" label="家庭住址" min-width="200">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="onDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <my-pagination :total="total" :currentPage="pageNo" :pageSize="pageSize" @sizeChange="onSizeChange" @currentChange="onCurrentChange" />

  </div>
</template>

<script>
import studentUserFilter from '@com/systemModule/studentUserFilter'
export default {
  name: 'studentUser',
  components: {
    studentUserFilter
  },
  data() {
    return {
      keyword: '',
      dorBuildingId: null,
      dorRoomId: null,
      total: 0,
      pageNo: 1,
      pageSize: 10,
      dataList: [], // 数据列表

    }
  },
  created() {
    this.getDataList()
  },
  activated() {
    this.getDataList()
  },
  methods: {
    // 获取数据
    async getDataList() {
      let params = {
        keyword: this.keyword,
        dorBuildingId: this.dorBuildingId,
        dorRoomId: this.dorRoomId,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }
      let res = await this.$http.post('/student/info/list', params)
      if (res.errorCode === 0) {
        this.total = res.total
        this.dataList = res.data || []
      }
    },
    // 筛选回调
    onConfirmFilter(obj) {
      this.keyword = obj.keyword
      this.dorBuildingId = obj.dorBuildingId
      this.dorRoomId = obj.dorRoomId
      this.getDataList()
    },

    // 条数改变
    onSizeChange(value) {
      this.pageSize = value
      this.getDataList()
    },

    // 页数改变
    onCurrentChange(value) {
      this.pageNo = value
      this.getDataList()
    },

    // 增加
    onAdd() {
      this.routerPush({
        name: 'studentUserEdit'
      })
    },

    // 编辑
    onEdit(item) {
      this.routerPush({
        name: 'studentUserEdit',
        params: {
          id: item.id
        }
      })
    },

    // 删除
    onDelete(item) {
      this.$confirm(`删除后不可恢复，确定删除这条数据吗？`, '温馨提示')
        .then(async () => {
          let params = {
            id: item.id,
            dorRoomId: item.dorRoomId
          }
          let res = await this.$http.post('/student/info/delete', params)
          if (res.errorCode === 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getDataList()
          }
        })
    },

  }
}
</script>

<style lang="scss" scoped>
.student-user-img {
  width: 26px;
  border-radius: 4px;
}
</style>