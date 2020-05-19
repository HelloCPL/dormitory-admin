<template>
  <div class="we-flex-column we-width-100pc we-height-100pc">
    <!-- 筛选条件 -->
    <div class="we-scroll-y filter-box">
      <leave-and-return-filter @confirm="onConfirmFilter" />
    </div>
    <!-- 列表渲染 -->
    <div class="we-flex-1 we-scroll-y">
      <el-table stripe :data="dataList" width="100%" height="100%">
        <el-table-column prop="studentName" label="学生姓名" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="电话号码" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dorBuildingName" label="所属宿舍" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dorRoomName" label="房间名称" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新时间" width="140">
          <template slot-scope="scope">
            <span>{{scope.row.updateTime | dateFormat('YYYY-MM-DD hh:mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="离校状态" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.statusWord == '未开始'" class="we-color-tip">未开始</span>
            <span v-if="scope.row.statusWord == '离校中'">离校中</span>
            <span v-if="scope.row.statusWord == '已返校'" class="we-color-green">已返校</span>
            <span v-if="scope.row.statusWord == '未确认'" class="we-color-red">未确认</span>
          </template>
        </el-table-column>
        <el-table-column label="离校时间" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.startTime | dateFormat('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="返校时间" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.endTime | dateFormat('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注说明" min-width="160" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <my-pagination :total="total" :currentPage="pageNo" :pageSize="pageSize" @sizeChange="onSizeChange" @currentChange="onCurrentChange" />

  </div>
</template>

<script>
import leaveAndReturnFilter from '@com/dormitoryModule/leaveAndReturnFilter'
export default {
  name: 'stuLeaveAndReturn',
  components: {
    leaveAndReturnFilter
  },
  data() {
    return {
      searchData: {
        keyword: '',
        dorBuildingId: null,
        dorRoomId: null,
        timeStatus: null,
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
      let res = await this.$http.post('/dorstudent/status/atschool', params)
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
      this.searchData.timeStatus = obj.timeStatus
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
  }
}
</script>

<style lang="scss" scoped>
.filter-box {
  max-height: 210px;
}
</style>