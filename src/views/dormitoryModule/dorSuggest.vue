<template>
  <div class="we-flex-column we-width-100pc we-height-100pc">
    <!-- 筛选条件 -->
    <div class="we-scroll-y filter-box">
      <dor-suggest-filter @confirm="onConfirmFilter" />
    </div>
     <!-- 列表渲染 -->
    <div class="we-flex-1 we-scroll-y">
      <el-table stripe :data="dataList" width="100%" height="100%">
        <el-table-column prop="releaseUserName" label="学生姓名" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="电话号码" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dorBuildingName" label="所属宿舍" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dorRoomName" label="房间名称" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column label="类型" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">投诉</span>
            <span v-else-if="scope.row.type == 2">建议</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="投诉/建议内容" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" width="140">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | dateFormat('YYYY-MM-DD hh:mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="replyUserName" label="处理人" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="处理时间" width="140">
          <template slot-scope="scope">
            <span>{{scope.row.replyTime | dateFormat('YYYY-MM-DD hh:mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="replyContent" label="回复内容" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column label="处理状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">待审核</span>
            <span v-else-if="scope.row.status == 2" class="we-color-green">已采纳</span>
            <span v-else-if="scope.row.status == 0" class="we-color-red">审核不通过</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注说明" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row.id, 1)" type="text" size="small" v-if="scope.row.status == 1">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <my-pagination :total="total" :currentPage="pageNo" :pageSize="pageSize" @sizeChange="onSizeChange" @currentChange="onCurrentChange" />

  </div>
</template>

<script>
import dorSuggestFilter from '@com/dormitoryModule/dorSuggestFilter'
export default {
  name: 'dorSuggest',
  components: {
    dorSuggestFilter,
  },
  data() {
    return {
      searchData: {
        keyword: '',
        dorBuildingId: null,
        dorRoomId: null,
        type: null,
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
      let res = await this.$http.post('/doraffair/suggestion/list', params)
      if (res.errorCode === 0) {
        this.total = res.total
        this.dataList = res.data || []
      }
    },

    // 编辑
    async onEdit(id) {
      this.routerPush({
        name: 'dorSuggestEdit',
        params: {
          id
        }
      })
    },

    // 筛选条件
    onConfirmFilter(obj) {
      this.pageNo = 1
      this.searchData.keyword = obj.keyword
      this.searchData.dorBuildingId = obj.dorBuildingId
      this.searchData.dorRoomId = obj.dorRoomId
      this.searchData.type = obj.type
      this.searchData.status = obj.status
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