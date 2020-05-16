<template>
  <div class="we-flex-column we-width-100pc we-height-100pc">
    <!-- 筛选条件 -->
    <div class="we-scroll-y filter-box">
      <notices-filter @confirm="onConfirmFilter" />
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
        <el-table-column prop="title" label="标题" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column label="缩略图" width="80">
          <template slot-scope="scope">
            <img :src="scope.row.thumbnail.fullName" alt="" v-if="scope.row.thumbnail && scope.row.thumbnail.fullName"
              class="notices-img" />
          </template>
        </el-table-column>
        <el-table-column label="类型" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">公告</span>
            <span v-else-if="scope.row.type == 2">日常管理</span>
            <span v-else-if="scope.row.type == 3">管理规定</span>
            <span v-else-if="scope.row.type == 4">服务指南</span>
            <span v-else-if="scope.row.type == 5">安全警示</span>
            <span v-else-if="scope.row.type == 6">中心简介</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="140">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | dateFormat('YYYY-MM-DD hh:mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="releaseUserName" label="修改人" min-width="100"></el-table-column>
        <el-table-column label="修改时间" width="140">
          <template slot-scope="scope">
            <span>{{scope.row.updateTime | dateFormat('YYYY-MM-DD hh:mm')}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="有效起始时间" width="140">
          <template slot-scope="scope">
            <span>{{scope.row.startTime | dateFormat('YYYY-MM-DD hh:mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="有效结束时间" width="140">
          <template slot-scope="scope">
            <span>{{scope.row.endTime | dateFormat('YYYY-MM-DD hh:mm')}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="展示状态" width="100">
          <template slot-scope="scope">
            <span v-if="nowDateValue > scope.row.startTime && nowDateValue < scope.row.endTime">正在展示</span>
            <span class="we-color-tip" v-else-if="nowDateValue <= scope.row.startTime">未开始</span>
            <span class="we-color-red" v-else-if="nowDateValue >= scope.row.endTime">已过期</span>
          </template>
        </el-table-column>

        <el-table-column label="是否公开" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.isPublic == 1">公开</span>
            <span v-else-if="scope.row.isPublic == 0">不公开</span>
          </template>
        </el-table-column>
        <el-table-column label="是否置顶" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.isTop == 1">置顶</span>
            <span v-else-if="scope.row.isTop == 0">不置顶</span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" min-width="50"></el-table-column>
        <el-table-column prop="browseCount" label="浏览数量" min-width="80"></el-table-column>
        <el-table-column prop="abstract" label="简介" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="onEdit(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <my-pagination :total="total" :currentPage="pageNo" :pageSize="pageSize" @sizeChange="onSizeChange" @currentChange="onCurrentChange" />
  </div>
</template>

<script>
import noticesFilter from '@com/managementModule/noticesFilter'
export default {
  name: 'notices',
  components: {
    noticesFilter
  },
  data() {
    return {
      searchData: {
        keyword: '',
        timeStatus: null,
        isPublic: null,
        isTop: null,
        type: null,
      },
      pageNo: 1,
      pageSize: 10,
      total: 0,
      dataList: [], // 数据列表
      selectDataList: [], // 选中的数据
      nowDateValue: 0, // 当前时间

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
      let res = await this.$http.post('/management/notices/list', params)
      if (res.errorCode === 0) {
        this.total = res.total
        this.dataList = res.data || []
        this.nowDateValue = this.$dayjs().valueOf()
      }
    },

    // 筛选条件
    onConfirmFilter(obj) {
      this.pageNo = 1
      this.searchData.keyword = obj.keyword
      this.searchData.timeStatus = obj.timeStatus
      this.searchData.isPublic = obj.isPublic
      this.searchData.isTop = obj.isTop
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
      this.routerPush({
        name: 'noticesEdit'
      })
    },

    // 编辑
    onEdit(item) {
      this.routerPush({
        name: 'noticesEdit',
        params: {
          id: item.id
        }
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
            let res = await this.$http.post('/management/notices/delete', { ids: ids.join(',') })
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

<style lang="scss" scoped>
.filter-box {
  max-height: 210px;
}
.notices-img {
  width: 60px;
  border-radius: 4px;
}
</style>