<template>
  <div>
    <my-filter-box>
      <div class="we-padding">
        <el-form ref="form" :model="dataInfo" label-position="left" label-width="100px" class="we-flex-wrap">
          <el-form-item label="关键字" class="we-width-300 we-margin-right-20">
            <el-input v-model="dataInfo.keyword" prefix-icon="el-icon-search" placeholder="请输入关键字" clearable></el-input>
          </el-form-item>
          <el-form-item label="所属宿舍栋" class="we-width-300 we-margin-right-20">
            <el-select v-model="dataInfo.dorBuildingId" filterable remote clearable placeholder="请输入选择" :loading="loading"
              :filter-method="filterMethod" @change="onChange">
              <el-option v-for="item in optionsBuilding" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房间名称" class="we-width-300 we-margin-right-20">
            <el-select v-model="dataInfo.dorRoomId" filterable remote clearable placeholder="请输入选择" :loading="loading"
              :filter-method="filterMethodRoom">
              <el-option v-for="item in optionsRoom" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <template slot="button">
        <div class="we-padding">
          <el-button type="primary" @click="onConfirm">搜索</el-button>
          <el-button @click="onCancel">重置</el-button>
        </div>
      </template>
    </my-filter-box>
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
      },
      optionsBuilding: [], // 宿舍栋选择列表
      optionsRoom: [], // 宿舍房间选择列表
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
      this.dataInfo.dorBuildingId = ''
      this.dataInfo.dorRoomId = ''
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
        this.optionsBuilding = res.data || []
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
        this.optionsRoom = res.data || []
      this.loading = false
    }

  }
}
</script>
