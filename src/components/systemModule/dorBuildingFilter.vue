<template>
  <div>
    <my-filter-box>
      <div class="we-padding">
        <el-form ref="form" :model="dataInfo" label-position="left" label-width="80px">
          <el-form-item label="关键字" class="we-width-300">
            <el-input v-model="dataInfo.keyword" prefix-icon="el-icon-search" placeholder="请输入关键字" clearable></el-input>
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
        keyword: ''
      }
    }
  },
  methods: {
    // 确认
    onConfirm() {
      this.$emit('confirm', this.dataInfo.keyword)
    },

    // 取消
    onCancel() {
      this.dataInfo.keyword = ''
    },
  }
}
</script>
