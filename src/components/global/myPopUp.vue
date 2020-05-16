<template>
  <div class="we-width-100pc we-height-100pc pop-up-container" v-if="value">
    <div class="we-bg-white pop-up-box">
      <div class="we-padding we-flex-jc-ai we-border-bottom-1">
        <span>{{title}}</span>
        <img src="@img/icon_close.png" alt="" class="we-width-16 we-height-16 we-pointer" @click="onClose">
      </div>
      <div class="we-bg">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '大标题'
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClose() {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.pop-up-container {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;

  .pop-up-box {
    min-width: 250px;
    min-height: 100px;
  }
}
</style>
