<template>
  <div class="repair-container">
    dorRepair 页面
    <template v-for="(item, index) in 100">
      <div style="margin-top: 20px;" :key="index">
        d还是经典款{{index}}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'dorRepair',
  created() {
    console.log('dorRepair')
  }
}
</script>

<style lang="scss" scoped>
@import "./dorRepair.scss";
</style>