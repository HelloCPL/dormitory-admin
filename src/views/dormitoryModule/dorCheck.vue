<template>
  <div class="we-flex-column we-width-100pc we-height-100pc">
    <!-- 筛选条件 -->
    <div class="we-scroll-y">
      <dor-check-filter @confirm="onConfirmFilter" />
    </div>
    <!-- 按钮 -->
    <div class="we-width-100pc we-border-bottom-1 we-padding">
      <el-button type="primary" @click="onAdd">增加</el-button>
      <el-button @click="onDelete">删除</el-button>
    </div>
    <!-- 列表渲染 -->
    <div class="we-flex-1 we-scroll-y">
      <el-table stripe :data="dataList" width="100%" height="100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="80"></el-table-column>
        <el-table-column prop="dorBuildingName" label="所属宿舍" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dorRoomName" label="房间名称" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column label="检查类型" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">评优</span>
            <span v-else-if="scope.row.type == 2">违纪</span>
            <span v-else-if="scope.row.type == 3">卫生检查</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="评价等级" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">非常差</span>
            <span v-else-if="scope.row.type == 2">差</span>
            <span v-else-if="scope.row.type == 3">合格</span>
            <span v-else-if="scope.row.type == 4">良好</span>
            <span v-else-if="scope.row.type == 5">优秀</span>
          </template>
        </el-table-column>
        <el-table-column prop="releaseUserName" label="发布者" min-width="100"></el-table-column>
        <el-table-column label="检查时间" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.checkTime | dateFormat('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="检查时间段" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.startTime | dateFormat('YYYY-MM-DD')}}至{{scope.row.endTime | dateFormat('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="检查内容" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" label="备注说明" min-width="160" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <my-pagination :total="total" :currentPage="pageNo" :pageSize="pageSize" @sizeChange="onSizeChange" @currentChange="onCurrentChange" />

  </div>
</template>

<script>
import dorCheckFilter from '@com/dormitoryModule/dorCheckFilter'
export default {
  name: 'dorCheck',
  inject: ['newTab', 'tabdeleteMethods'],
  components: {
    dorCheckFilter
  },
  data() {
    return {
      searchData: {
        keyword: '',
        dorBuildingId: null,
        dorRoomId: null,
        type: null,
        scope: null,
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      dataList: [], // 数据列表
      selectDataList: [], // 选中的数据

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
      let res = await this.$http.post('/doraffair/check/list', params)
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
      this.searchData.scope = obj.scope
      if (this._.isArray(obj.type) && obj.type.length) {
        this.searchData.type = obj.type.join(',')
      } else {
        this.searchData.type = null
      }
      this.getDataList()
    },

    // 表格选中数据
    handleSelectionChange(data) {
      this.selectDataList = data
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
      this.newTab({
        name: "新增数据检查",
        to: "dorCheckAdd",
      })
    },

    // 删除
    onDelete() {
      let arr = this.selectDataList
      if (this._.isArray(arr) && arr.length) {
        let ids = []
        arr.forEach(item => {
          if (item.id)
            ids.push(item.id)
        })
        this.$confirm(`删除后不可恢复，确定删除这${ids.length}条数据吗？`, '温馨提示')
          .then(async () => {
            let res = await this.$http.post('/doraffair/check/delete', { ids: ids.join(',') })
            if (res.errorCode === 0) {
              this.$message({
                type: 'success',
                message: res.data
              })
              this.getDataList()
            }
          })
      } else {
        this.$message('请至少选择一条数据')
      }
    },

  }
}
</script>
