<template>
  <div class="we-flex-column we-width-100pc we-height-100pc">
    <!-- 筛选条件 -->
    <dor-room-filter @confirm="onConfirmFilter" />
    <!-- 按钮 -->
    <div class="we-width-100pc we-border-bottom-1 we-padding">
      <el-button type="primary" @click="onAdd">增加</el-button>
      <!-- <el-button @click="onDelete">删除</el-button> -->
    </div>
    <!-- 列表渲染 -->
    <div class="we-flex-1 we-scroll-y">
      <el-table stripe :data="dataList" width="100%" height="100%">
        <el-table-column prop="name" label="宿舍房间" min-width="100">
        </el-table-column>
        <el-table-column prop="total" label="床位数量" min-width="80">
        </el-table-column>
        <el-table-column prop="count" label="入住数量" min-width="80">
        </el-table-column>
        <el-table-column prop="dorBuildingName" label="所属宿舍栋" min-width="100">
        </el-table-column>
        <el-table-column prop="remark" label="说明" min-width="150">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <div>
              <el-button @click="onEdit(scope.row)" type="text" size="small" class="we-padding-0">编辑</el-button>
              <el-button @click="onDelete(scope.row)" type="text" size="small">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <my-pagination :total="total" :currentPage="pageNo" :pageSize="pageSize" @sizeChange="onSizeChange" @currentChange="onCurrentChange" />

    <!-- 新增宿舍栋 -->
    <my-pop-up v-model="showAdd" title="新增宿舍房间" key="1">
      <dor-room-add @cancel="showAdd = false" @confirm="onConfirmAdd" />
    </my-pop-up>

    <!-- 编辑宿舍栋 -->
    <my-pop-up v-model="showEdit" title="编辑宿舍房间" key="2">
      <dor-room-add @cancel="showEdit = false" @confirm="onConfirmAdd" :editData="editData" />
    </my-pop-up>

  </div>
</template>

<script>
import dorRoomFilter from '@com/systemModule/dorRoomFilter'
import dorRoomAdd from '@com/systemModule/dorRoomAdd'
export default {
  name: 'dorRoom',
  components: {
    dorRoomFilter,
    dorRoomAdd
  },
  data() {
    return {
      keyword: '',
      dorBuildingId: null,
      total: 0,
      pageNo: 1,
      pageSize: 10,
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
        dorBuildingId: this.dorBuildingId,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }
      let res = await this.$http.post('/dorroom/list', params)
      if (res.errorCode === 0) {
        this.total = res.total
        this.dataList = res.data || []
      }
    },

    // 筛选回调
    onConfirmFilter(obj) {
      this.keyword = obj.keyword
      this.dorBuildingId = obj.dorBuildingId
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
          let params = {
            id: item.id,
            dorBuildingId: item.dorBuildingId
          }
          let res = await this.$http.post('/dorroom/delete', params)
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