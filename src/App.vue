<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.setFontSize()
  },

  methods: {
    setFontSize() {
      let fontSizeValue = localStorage.getItem('fontSizeValue')
      if (fontSizeValue) {
        fontSizeValue = parseInt(fontSizeValue)
        document.getElementsByTagName('body')[0].style.setProperty('--smallerFont', fontSizeValue - 4 + 'px')
        document.getElementsByTagName('body')[0].style.setProperty('--smallFont', fontSizeValue - 2 + 'px')
        document.getElementsByTagName('body')[0].style.setProperty('--normalFont', fontSizeValue + 'px')
        document.getElementsByTagName('body')[0].style.setProperty('--largeFont', fontSizeValue + 2 + 'px')
        document.getElementsByTagName('body')[0].style.setProperty('--largerFont', fontSizeValue + 4 + 'px')
        document.getElementsByTagName('body')[0].style.setProperty('--font20', fontSizeValue + 6 + 'px')
      }
    }
  }
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
