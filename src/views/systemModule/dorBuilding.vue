<template>
  <div class="we-flex-column we-width-100pc we-height-100pc">
    <!-- 筛选条件 -->
    <dor-building-filter @confirm="onConfirmFilter" />
    <!-- 按钮 -->
    <div class="we-width-100pc we-border-bottom-1 we-padding">
      <el-button type="primary" @click="onAdd">增加</el-button>
      <!-- <el-button @click="onDelete">删除</el-button> -->
    </div>
    <!-- 列表渲染 -->
    <div class="we-flex-1 we-scroll-y">
      <el-table stripe :data="dataList" width="100%" height="100%">
        <el-table-column prop="name" label="宿舍名称" min-width="140">
        </el-table-column>
        <el-table-column prop="count" label="房间数量" min-width="100">
        </el-table-column>
        <el-table-column prop="desc" label="宿舍简介" min-width="300">
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

    <!-- 新增宿舍栋 -->
    <my-pop-up v-model="showAdd" title="新增宿舍栋" key="1">
      <dor-building-add @cancel="showAdd = false" @confirm="onConfirmAdd" />
    </my-pop-up>

    <!-- 编辑宿舍栋 -->
    <my-pop-up v-model="showEdit" title="编辑宿舍栋" key="2">
      <dor-building-add @cancel="showEdit = false" @confirm="onConfirmAdd" :editData="editData" />
    </my-pop-up>

  </div>
</template>

<script>
import dorBuildingFilter from '@com/systemModule/dorBuildingFilter'
import dorBuildingAdd from '@com/systemModule/dorBuildingAdd'
export default {
  name: 'dorBuilding',
  components: {
    dorBuildingFilter,
    dorBuildingAdd
  },
  data() {
    return {
      keyword: '',
      pageNo: 1,
      pageSize: 10,
      total: 0,
      dataList: [], // 数据列表

      showAdd: false,
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
        keyword: this.keyword,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }
      let res = await this.$http.post('/dorbuilding/list', params)
      if (res.errorCode === 0) {
        this.total = res.total
        this.dataList = res.data || []
      }
    },

    // 筛选条件确认
    onConfirmFilter(value) {
      this.pageNo = 1
      this.keyword = value
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

    // 新增或编辑宿舍栋回调
    onConfirmAdd() {
      this.showAdd = false
      this.showEdit = false
      this.getDataList()
    },

    // 增加
    onAdd() {
      this.showAdd = true
    },

    // 编辑
    onEdit(item) {
      this.showEdit = true
      this.editData = item
    },

    // 删除
    onDelete(item) {
      this.$confirm(`删除后不可恢复，确定删除这条数据吗？`, '温馨提示')
        .then(async () => {
          let res = await this.$http.post('/dorbuilding/delete', { id: item.id })
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