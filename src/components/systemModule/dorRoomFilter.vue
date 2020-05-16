<template>
  <div class="we-width-100pc we-border-bottom-1 we-flex">
    <div class="we-flex-1 we-padding">
      <el-form ref="form" :model="dataInfo" label-position="left" label-width="100px" class="we-flex-wrap">
        <el-form-item label="关键字" class="we-width-300 we-margin-right-20">
          <el-input v-model="dataInfo.keyword" prefix-icon="el-icon-search" placeholder="请输入关键字" clearable></el-input>
        </el-form-item>
        <el-form-item label="所属宿舍栋" class="we-width-300">
          <el-select v-model="dataInfo.dorBuildingId" filterable remote clearable placeholder="请输入选择" :loading="loading"
            :filter-method="filterMethod">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
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
      },
      options: [],
      loading: false,
    }
  },
  created() {
    this.filterMethod()
  },
  activated() {
    this.filterMethod()
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
    },

    // 远程获取宿舍栋筛选条件
    async filterMethod(e) {
      let params = {
        pageNo: 1,
        pageSize: 50,
        keyword: e
      }
      this.loading = true
      let res = await this.$http.post('/dorbuilding/list', params)
      if (res.errorCode === 0)
        this.options = res.data
      this.loading = false
    }
  }
}
</script>
