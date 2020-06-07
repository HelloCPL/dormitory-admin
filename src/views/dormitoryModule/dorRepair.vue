<template>
  <div class="we-flex-column we-width-100pc we-height-100pc">
    <!-- 筛选条件 -->
    <div class="we-scroll-y">
      <dor-repair-filter @confirm="onConfirmFilter" />
    </div>
   <!-- 列表渲染 -->
    <div class="we-flex-1 we-scroll-y">
      <el-table stripe :data="dataList" width="100%" height="100%">
        <el-table-column prop="releaseUserName" label="申请人" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="电话号码" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dorBuildingName" label="所属宿舍" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dorRoomName" label="房间名称" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="content" label="维修内容" min-width="140" show-overflow-tooltip></el-table-column>
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
            <span v-else-if="scope.row.status == 2" class="we-color-orange">待处理</span>
            <span v-else-if="scope.row.status == 3" class="we-color-green">已处理</span>
            <span v-else-if="scope.row.status == 4" class="we-color-green">已评价</span>
            <span v-else-if="scope.row.status == 0" class="we-color-red">审核不通过</span>
          </template>
        </el-table-column>
        <el-table-column prop="repairWorker" label="维修人" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column label="维修时间" width="140">
          <template slot-scope="scope">
            <span>{{scope.row.repairTime | dateFormat('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="评价" width="80">
          <template slot-scope="scope">
            <el-button @click="onCheck(scope.row)" type="text" size="small" v-if="scope.row.evaluationId">查看</el-button>
            <span v-else class="we-tip">暂无</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注说明" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row, 1)" type="text" size="small" v-if="scope.row.status == 1">审核</el-button>
            <el-button @click="onEdit(scope.row, 2)" type="text" size="small" v-else-if="scope.row.status == 2">确认处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <my-pagination :total="total" :currentPage="pageNo" :pageSize="pageSize" @sizeChange="onSizeChange" @currentChange="onCurrentChange" />
    <!-- 查看评价 -->
    <my-pop-up v-model="showCheck" title="查看评价">
      <dor-repair-check :dataInfo="dataInfo" @confirm="showCheck = false" />
    </my-pop-up>
    <!-- 审核 -->
    <my-pop-up v-model="showAudit" title="审核">
      <dor-repair-audit :editData="dataInfo" @cancel="showAudit = false" @confirm="onConfirmAudit" />
    </my-pop-up>
    <!-- 确认处理 -->
    <my-pop-up v-model="showConfirm" title="确认处理">
      <dor-repair-confirm :editData="dataInfo" @cancel="showConfirm = false" @confirm="onConfirmAudit" />
    </my-pop-up>

  </div>
</template>

<script>
import dorRepairFilter from '@com/dormitoryModule/dorRepairFilter'
import dorRepairCheck from '@com/dormitoryModule/dorRepairCheck'
import dorRepairAudit from '@com/dormitoryModule/dorRepairAudit'
import dorRepairConfirm from '@com/dormitoryModule/dorRepairConfirm'
export default {
  name: 'dorRepair',
  components: {
    dorRepairFilter,
    dorRepairCheck,
    dorRepairAudit,
    dorRepairConfirm
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

      dataInfo: {}, // 弹框内容
      showCheck: false, // 评价显示
      showAudit: false, // 审核显示
      showConfirm: false, // 确认处理显示

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
      let res = await this.$http.post('/doraffair/repair/list', params)
      if (res.errorCode === 0) {
        this.total = res.total
        this.dataList = res.data || []
      }
    },

    // 查看评价
    onCheck(item) {
      this.dataInfo = item
      this.showCheck = true
    },

    // 编辑
    async onEdit(item, status) {
      if (status == 1) {
        this.dataInfo = item
        this.showAudit = true
      } else if (status == 2) {
        this.dataInfo = item
        this.showConfirm = true
      }
    },

    // 审核回调
    onConfirmAudit() {
      this.showAudit = false
      this.showConfirm = false
      this.getDataList()
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
