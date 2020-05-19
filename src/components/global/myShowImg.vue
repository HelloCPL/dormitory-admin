<template>
  <div class="we-flex">
    <!-- 如果图片是对象 -->
    <template v-if="imgType == 1">
      <div class="we-border-1 we-margin-right-10 we-margin-bottom-10 we-padding-5 img-box" @mouseenter="isEnter = true"
        @mouseleave="isEnter = false">
        <img :src="value.fullName" alt="" class="we-width-100pc">
        <div class="cover-box" v-if="isEnter">
          <img src="@img/icon_magnify.png" alt="" class="we-width-18 we-height-18 we-pointer we-margin-right-10" @click="previewImg(value.fullName)">
          <img src="@img/icon_delete.png" alt="" class="we-width-18 we-height-18 we-pointer" @click="deleteImg(value.shortName, 1)">
        </div>
      </div>
    </template>
    <!-- 如果图片是数组 -->
    <div v-if="imgType == 2 && value.length" class="we-flex">
      <template v-for="(item, index) in value">
        <div class="we-border-1 we-margin-right-10 we-margin-bottom-10 we-padding-5 img-box" @mouseenter="acitve = index"
          @mouseleave="acitve = null" :key="index">
          <img :src="item.fullName" alt="" class="we-width-100pc">
          <div class="cover-box" v-if="acitve === index && (!noPreview || !noDelete)">
            <img src="@img/icon_magnify.png" alt="" class="we-width-18 we-height-18 we-pointer we-margin-right-10"
              @click="previewImg(item.fullName)" v-if="!noPreview">
            <img src="@img/icon_delete.png" alt="" class="we-width-18 we-height-18 we-pointer" @click="deleteImg(item.shortName, 2, index)" v-if="!noDelete">
          </div>
        </div>
      </template>
    </div>
    <!-- 图片预览 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Object, Array],
      default: null
    },
    noPreview: { // 不需放大功能
      type: Boolean,
      default: false,
    },
    noDelete: {// 不需删除功能
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      isEnter: false,
      acitve: null,
      dialogVisible: false,
      dialogImageUrl: null
    }
  },
  computed: {
    imgType() { // 1 对象 2 数组
      let i = 0
      if (this._.isObject(this.value)) {
        i = 1
      }
      if (this._.isArray(this.value)) {
        i = 2
      }
      return i
    }
  },
  methods: {
    // 图片预览
    previewImg(fullName) {
      this.dialogVisible = true
      this.dialogImageUrl = fullName
    },

    // 删除图片
    async deleteImg(shortName, status, index) {
      let res = await this.$http.get('/file/delete', { url: shortName })
      if (res.errorCode === 0) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        if (status == 1) {
          this.$emit('input', null)
        } else if (status == 2) {
          this.value.splice(index, 1)
          this.$emit('input', this.value)
        }
      }
    }
  },

  watch: {
    value: {
      handler(val, oldVal) {
        if (val === oldVal) return
      },
      deep: true,
      immediate: true
    }
  },
}
</script>

<style lang="scss" scoped>
.img-box {
  width: 146px;
  height: 146px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.cover-box {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
