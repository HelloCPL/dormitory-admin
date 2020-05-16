<template>
  <div class="we-width-100pc we-border-bottom-1 we-flex">
    <div class="we-flex-1 we-padding">
      <el-form ref="form" :model="dataInfo" label-position="left" label-width="80px" >
        <el-form-item label="关键字" class="we-width-300">
          <el-input v-model="dataInfo.keyword" prefix-icon="el-icon-search" placeholder="请输入关键字" clearable></el-input>
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
