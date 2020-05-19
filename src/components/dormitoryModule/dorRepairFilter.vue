<template>
  <div class="we-width-100pc we-border-bottom-1 we-flex">
    <div class="we-flex-1 we-padding">
      <el-form ref="form" :model="dataInfo" label-position="left" label-width="100px" class="we-flex-wrap">
        <el-form-item label="关键字" class="we-width-300 we-margin-right-20">
          <el-input v-model="dataInfo.keyword" prefix-icon="el-icon-search" placeholder="请输入关键字" clearable></el-input>
        </el-form-item>
        <el-form-item label="所属宿舍" class="we-width-300 we-margin-right-20">
          <el-select v-model="dataInfo.dorBuildingId" filterable remote clearable placeholder="请输入选择" :loading="loading"
            :filter-method="filterMethod" @change="onChange">
            <el-option v-for="item in filterData.optionsBuilding" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间名称" class="we-width-300 we-margin-right-20">
          <el-select v-model="dataInfo.dorRoomId" filterable remote clearable placeholder="请输入选择" :loading="loading"
            :filter-method="filterMethodRoom">
            <el-option v-for="item in filterData.optionsRoom" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理状态" class="we-width-300 we-margin-right-20">
          <el-select v-model="dataInfo.status" clearable placeholder="请选择">
            <el-option v-for="item in filterData.statusList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="we-padding">
      <el-button type="primary" @click="onConfirm">搜索</el-button>
      <el-button @click="onCancel">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataInfo: {
        keyword: '',
        dorBuildingId: null,
        dorRoomId: null,
        status: null, // 评价等级

      },
      filterData: {
        optionsBuilding: [], // 宿舍栋选择列表
        optionsRoom: [], // 宿舍房间选择列表
        statusList: [{ id: 1, name: '待审核' }, { id: 2, name: '待处理' }, { id: 3, name: '已处理' }, { id: 4, name: '已评价' }, { id: 0, name: '审核不通过' }]
      },
      loading: false,
    }
  },
  created() {
    this.filterMethod()
    this.filterMethodRoom()
  },
  activated() {
    this.filterMethod()
    this.filterMethodRoom()
  },
  methods: {
    // 确认
    onConfirm() {
      this.$emit('confirm', this.dataInfo)
    },

    // 取消
    onCancel() {
      this.dataInfo.keyword = ''
      this.dataInfo.dorBuildingId = null
      this.dataInfo.dorRoomId = null
      this.dataInfo.status = null
    },

    // 远程获取宿舍栋筛选条件
    async filterMethod(e) {
      let params = {
        pageNo: 1,
        pageSize: 50,
        keyword: e,
      }
      this.loading = true
      let res = await this.$http.post('/dorbuilding/list', params)
      if (res.errorCode === 0)
        this.filterData.optionsBuilding = res.data || []
      this.loading = false
    },

    // 宿舍栋选择变化
    onChange() {
      this.dataInfo.dorRoomId = ''
      this.filterMethodRoom()
    },

    // 远程获取宿舍房间筛选条件
    async filterMethodRoom(e) {
      let params = {
        pageNo: 1,
        pageSize: 50,
        keyword: e,
        dorBuildingId: this.dataInfo.dorBuildingId
      }
      this.loading = true
      let res = await this.$http.post('/dorroom/list', params)
      if (res.errorCode === 0)
        this.filterData.optionsRoom = res.data || []
      this.loading = false
    }

  }
}
</script>
