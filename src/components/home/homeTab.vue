<template>
  <div class="we-width-100pc we-relative home-tab-container" ref="homeTabContainer">
    <div class="we-flex home-tab-box" ref="homeTabBox">
      <div class="we-text we-border-top-1 we-border-right-1 we-pointer we-font-center tab-page" :class="{'tab-page-active': menuActive == item.to}"
        v-for="(item, index) in countlist" :key="index + 'a'" @click="onSelected(item, index)">
        <span v-if="judgeTitle(item.name)" :title="item.name">{{handleTitle(item.name)}}</span>
        <span v-else>{{item.name}}</span>
        <i class="el-icon-close" @click.stop="deleteClick(item)" v-if="countlist.length > 1"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menus: {
      type: Array,
      default: function () {
        return []
      }
    },
    activeTo: {
      type: [String, Number],
    }
  },
  data() {
    return {
      screentX: 0, // 移动距离
      lastIndex: 0,
      menuActive: '', // 选中的数据
      countlist: [],

    }
  },
  methods: {
    // 选中的数据
    onSelected(item, index) {
      if (this.menuActive === item.to) return
      // this.onTranform(index, this.lastIndex)
      this.lastIndex = index
      this.menuActive = item.to
      this.onTranform(this.menuActive)
      this.$emit('onTabClick', item)
    },

    // 删除
    deleteClick(item) {
      this.$emit('onTabDetele', item)
      setTimeout(() => {
        this.onTranform(this.menuActive)
      }, 100)
    },

    // 移动tab 栏
    onTranform(menuActive) {
      this.$nextTick(() => {
        try {
          let containerBox = this.$refs.homeTabContainer
          let box = this.$refs.homeTabBox
          let containerWidth = containerBox.offsetWidth
          let boxWidth = box.offsetWidth
          if (containerWidth >= boxWidth) {
            box.style.left = '0px'
            return
          }
          let half = parseInt(containerWidth / 2)
          let diff = parseInt(boxWidth - containerWidth)
          let index
          this.countlist.find((item, i) => {
            if (item.to === menuActive) {
              index = i + 1
              return true
            }
          })
          // 不足盒子一半直接为 0
          if (index <= 2) {
            this.screentX = 0
            box.style.left = this.screentX + 'px'
            return
          }
          if (this.countlist.length - index <= 2) {
            this.screentX = -diff
            box.style.left = this.screentX + 'px'
            return
          }
          this.screentX = -(150 * index - half)
          this.screentX = this.screentX > 0 ? 0 : this.screentX
          this.screentX = this.screentX < -(diff) ? -diff : this.screentX
          box.style.left = this.screentX + 'px'
        } catch (e) { }
      })
    },

    // 判断标题是否超过一定长度
    judgeTitle(title) {
      if (title && title.length > 5) {
        return true
      }
      return false
    },

    // 处理标题过长
    handleTitle(title) {
      if (title && title.length > 5) {
        let start = title.slice(0, 1)
        let end = title.slice(-3)
        return start + '...' + end
      }
      return title
    },
  },
  watch: {
    menus: {
      handler(val, oldVal) {
        // if (val === oldVal) return
        this.countlist = this._.cloneDeep(val)
        this.$forceUpdate()
      },
      deep: true,
      immediate: true
    },
    activeTo(val, oldVal) {
      if (val === oldVal) return
      this.menuActive = val
      setTimeout(() => {
        this.onTranform(val)
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./homeTab.scss";
</style>

