<template>
  <div class="we-flex-column we-width-100pc we-height-100pc">
    <!-- 筛选条件 -->
    <div class="we-scroll-y">
      <dor-payment-filter @confirm="onConfirmFilter" />
    </div>
    <!-- 按钮 -->
    <div class="we-width-100pc we-border-bottom-1 we-padding">
      <el-button type="primary" @click="onAdd">增加</el-button>
      <el-button @click="onDelete">删除</el-button>
    </div>
    <div class="we-flex-1 we-scroll-y">
      <el-table stripe :data="dataList" width="100%" height="100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="80" :selectable="onSelectable"></el-table-column>
        <el-table-column prop="dorBuildingName" label="所属宿舍" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dorRoomName" label="房间名称" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="title" label="支付标题" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="content" label="支付内容" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="price" label="支付金额" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column label="支付开始时间" width="140">
          <template slot-scope="scope">
            <span>{{scope.row.startTime | dateFormat('YYYY-MM-DD hh:mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付结束时间" width="140">
          <template slot-scope="scope">
            <span>{{scope.row.endTime | dateFormat('YYYY-MM-DD hh:mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="releaseUserName" label="发布者" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" width="140">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | dateFormat('YYYY-MM-DD hh:mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="accountName" label="收款方" min-width="220" show-overflow-tooltip></el-table-column>
        <el-table-column label="支付状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">待支付</span>
            <span v-else-if="scope.row.status == 2" class="we-color-green">已支付</span>
            <span v-else-if="scope.row.status == 3" class="we-color-green">已线下支付</span>
            <span v-else-if="scope.row.status == 0" class="we-color-red">已取消</span>
          </template>
        </el-table-column>
        <el-table-column prop="payUserName" label="支付者" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="payUserPhone" label="支付者号码" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="支付时间" width="140">
          <template slot-scope="scope">
            <span>{{scope.row.payTime | dateFormat('YYYY-MM-DD hh:mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注说明" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="scope" v-if="scope.row.status == 1">
            <el-button @click="onHandleStauts(scope.row, 2)" type="text" size="small">确认支付</el-button>
            <el-button @click="onHandleStauts(scope.row, 3)" type="text" size="small">确认线下支付</el-button>
            <el-button @click="onHandleStauts(scope.row, 0)" type="text" size="small">取消订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <my-pagination :total="total" :currentPage="pageNo" :pageSize="pageSize" @sizeChange="onSizeChange" @currentChange="onCurrentChange" />

  </div>
</template>

<script>
import dorPaymentFilter from '@com/dormitoryModule/dorPaymentFilter'
export default {
  name: 'dorPayment',
  inject: ['newTab', 'tabdeleteMethods'],
  components: {
    dorPaymentFilter
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
      let res = await this.$http.post('/doraffair/payment/list', params)
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
        name: "新增宿舍缴费",
        to: "dorPaymentAdd"
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
            let res = await this.$http.post('/doraffair/payment/delete', { ids: ids.join(',') })
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

    // 修改状态
    onHandleStauts(row, status) {
      let msg = ''
      if (status == 2) {
        msg = '确认支付'
      } else if (status == 3) {
        msg = '确认线下支付'
      } else if (status == 0) {
        msg = '取消订单'
      }
      this.$confirm(`${msg}后将不可回退操作，确定继续吗？`, '温馨提示')
        .then(async () => {
          let params = {
            id: row.id,
            status,
            keyCode: 1
          }
          let res = await this.$http.post('/doraffair/payment/edit', params)
          if (res.errorCode === 0) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getDataList()
          }
        })
    },

    // 设置列可勾选状态
    onSelectable(row, index) {
      let flag = false
      if (row.status == 1) flag = true
      return flag
    }

  }
}
</script>
