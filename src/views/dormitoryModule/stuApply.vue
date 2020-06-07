<template>
  <div class="we-flex-column we-width-100pc we-height-100pc">
    <!-- 筛选条件 -->
    <div class="we-scroll-y">
      <stu-apply-filter @confirm="onConfirmFilter" />
    </div>
    <!-- 列表渲染 -->
    <div class="we-flex-1 we-scroll-y">
      <el-table stripe :data="dataList" width="100%" height="100%">
        <el-table-column prop="studentName" label="学生姓名" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="电话号码" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dorBuildingName" label="所属宿舍" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dorRoomName" label="房间名称" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column label="申请类型" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">来访人员</span>
            <span v-else-if="scope.row.type == 2">出入品</span>
            <span v-else-if="scope.row.type == 3">托管</span>
            <span v-else-if="scope.row.type == 4">其他</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="申请内容" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="reason" label="申请原因" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" width="140">
          <template slot-scope="scope">
            <span>{{scope.row.updateTime | dateFormat('YYYY-MM-DD hh:mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请开始时间" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.startTime | dateFormat('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请结束时间" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.endTime | dateFormat('YYYY-MM-DD')}}</span>
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
            <span v-if="scope.row.replyStatus == 1">待审核</span>
            <span v-else-if="scope.row.replyStatus == 2" class="we-color-orange">待处理</span>
            <span v-else-if="scope.row.replyStatus == 3" class="we-color-green">已处理</span>
            <span v-else-if="scope.row.replyStatus == 0" class="we-color-red">审核不通过</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row, 1)" type="text" size="small" v-if="scope.row.replyStatus == 1">审核</el-button>
            <el-button @click="onEdit(scope.row, 2)" type="text" size="small" v-else-if="scope.row.replyStatus == 2">确认处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <my-pagination :total="total" :currentPage="pageNo" :pageSize="pageSize" @sizeChange="onSizeChange" @currentChange="onCurrentChange" />

    <!-- 审核 -->
    <my-pop-up v-model="showEdit" title="审核">
      <stu-apply-add :editData="editData" @cancel="showEdit = false" @confirm="onConfirmAdd" />
    </my-pop-up>
  </div>
</template>

<script>
import stuApplyFilter from '@com/dormitoryModule/stuApplyFilter'
import stuApplyAdd from '@com/dormitoryModule/stuApplyAdd'
export default {
  name: 'stuApply',
  components: {
    stuApplyFilter,
    stuApplyAdd
  },
  data() {
    return {
      searchData: {
        keyword: '',
        dorBuildingId: null,
        dorRoomId: null,
        type: null,
        replyStatus: null,
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      dataList: [], // 数据列表

      showEdit: false,
      editData: {}, // 编辑的数据
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
      let res = await this.$http.post('/dorstudent/apply/list', params)
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
      this.searchData.replyStatus = obj.replyStatus
      if (this._.isArray(obj.type) && obj.type.length) {
        this.searchData.type = obj.type.join(',')
      } else {
        this.searchData.type = null
      }
      this.getDataList()
    },

    // 编辑
    async onEdit(item, status) {
      if (status == 1) {
        this.editData = item
        console.log(item)
        this.showEdit = true
      } else if (status == 2) {
        let params = {
          id: item.id,
          replyContent: item.replyContent,
          replyStatus: 3,
        }
        let res = await this.$http.post('/dorstudent/apply/edit', params)
        if (res.errorCode === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getDataList()
        }
      }
    },

    // 新增或编辑宿舍栋回调
    onConfirmAdd() {
      this.showEdit = false
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
