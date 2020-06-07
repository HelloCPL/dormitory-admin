<template>
  <div class="we-flex-column we-width-100pc we-height-100pc">
    <!-- 筛选条件 -->
    <div class="we-scroll-y">
      <belongings-filter @confirm="onConfirmFilter" />
    </div>
    <!-- 列表渲染 -->
    <div class="we-flex-1 we-scroll-y">
      <el-table stripe :data="dataList" width="100%" height="100%">
        <el-table-column prop="name" label="物品名称" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="studentName" label="学生姓名" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="电话号码" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dorBuildingName" label="所属宿舍" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dorRoomName" label="房间名称" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新时间" width="140">
          <template slot-scope="scope">
            <span>{{scope.row.updateTime | dateFormat('YYYY-MM-DD hh:mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="存放状态" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">保存中</span>
            <span v-if="scope.row.status == 2">外带中</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row.id, 2)" type="text" size="small" v-if="scope.row.status == 1">外带</el-button>
            <el-button @click="onEdit(scope.row.id, 1)" type="text" size="small" v-if="scope.row.status == 2">带回</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <!-- 分页 -->
    <my-pagination :total="total" :currentPage="pageNo" :pageSize="pageSize" @sizeChange="onSizeChange" @currentChange="onCurrentChange" />
  </div>
</template>

<script>
import belongingsFilter from '@com/dormitoryModule/belongingsFilter'
export default {
  name: 'stuBelongings',
  components: {
    belongingsFilter
  },
  data() {
    return {
      searchData: {
        keyword: '',
        dorBuildingId: null,
        dorRoomId: null,
        status: null,
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
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
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        ...this.searchData
      }
      let res = await this.$http.post('/dorstudent/property/list', params)
      if (res.errorCode === 0) {
        this.total = res.total
        this.dataList = res.data || []
      }
    },

    // 筛选条件
    onConfirmFilter(obj) {
      this.pageNo = 1
      this.searchData.keyword = obj.keyword
      this.searchData.dorBuildingId = obj.dorBuildingId
      this.searchData.dorRoomId = obj.dorRoomId
      this.searchData.status = obj.status
      this.getDataList()
    },

    async onEdit(id, status) {
      let params = {
        id,
        status
      }
      let res = await this.$http.post('/dorstudent/property/edit', params)
      if (res.errorCode === 0) {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.getDataList()
      }
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
  }

}
</script>