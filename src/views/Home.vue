<template>
  <div class="we-flex-column we-width-100pc we-bg home-container">
    <home-header />
    <div class="we-flex-1 we-width-100pc we-relative">
      <div class="we-width-100pc we-height-100pc box">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import homeHeader from '@com/home/home-header'

export default {
  name: 'Home',
  components: {
    homeHeader,
  },
}
</script>

<style lang="scss" scoped>
@import "./Home.scss";
</style>
