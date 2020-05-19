<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {

  },
  // watch: {
  //   // 全局监听路由变化
  //   '$route': {
  //     handler(val, oldVal) {
  //       if (val === oldVal) return
  //       console.log('路由', val)
  //     },
  //     deep: true,
  //     // immediate: true
  //   }
  // }
}
</script>

<style lang="scss">
#app {
  // 重写表格头部样式
  .el-table thead,
  .el-table thead th,
  .el-table thead tr {
    background-color: $bgTable;
    color: $textColor;
  }

  // 重写按钮padding
  .el-button {
    padding: 10px 24px;
  }

  .el-button--text {
    padding-left: 0;
    padding-right: 0;
  }
}

.el-tooltip__popper {
  max-width: 800px !important;
}
</style>
