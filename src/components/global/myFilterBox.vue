<template>
  <div ref="myFilterBox" class="we-width-100pc we-border-bottom-1 we-flex-jc filter-box" :class="{'pack-up-box': (!packUp && isMore)}"
    :style="{'height': (isMore && !packUp) ? (minHeight + 'px') : 'auto'}">
    <div class="we-flex-1">
      <slot></slot>
    </div>
    <div class=" we-flex we-nowrap">
      <slot name="button"></slot>
      <span class="we-margin-top-20 we-margin-left-5 we-margin-right-20" v-if="isMore">
        <span class="we-tip we-padding-right-5 we-pointer" @click="packUp = !packUp">{{packUp ? '收起' : '更多'}}</span>
        <img src="@img/icon_down.png" alt="" class="we-width-12 we-pointer arrow-img" :class="{'arrow-img-pack-up': packUp}"
          @click="packUp = !packUp">
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    minHeight: {
      type: Number,
      default: 84
    }
  },
  data() {
    return {
      isMore: false,
      packUp: false,
    }
  },
  mounted() {
    this.judgeFilterBox()
    window.onresize = () => {
      this.isMore = false
      this.judgeFilterBox()
    }
  },
  methods: {
    judgeFilterBox() {
      try {
        let h = this.$refs.myFilterBox.offsetHeight
        if (h > this.minHeight) {
          this.isMore = true
        }
      } catch (e) { }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./myFilterBox.scss";
</style>
