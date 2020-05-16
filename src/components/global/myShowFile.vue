<template>
  <div class="we-width-100pc">
    <template v-if="value && value.length">
      <div v-for="(item, index) in value" :key="index" @mouseenter="active = index" @mouseleave="active = null">
        <div class="we-flex-ai">
          <span class="we-color-blue file-word">{{item.shortName}}</span>
          <div class="we-nowrap we-margin-left-10 we-flex-ai btn-box">
            <span class="we-color-blue we-pointer" v-if="active === index" @click="downloadFile(item.fullName)">下载</span>
            <img src="@img/icon_delete_gray.png" alt="" class="we-margin-left-10 we-pointer we-width-20" v-if="active === index" @click="deleteFile(item.shortName, index)" />
          </div>
        </div>
        <div class="we-tip">{{item.fileSizeWord}}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      active: null,
    }
  },
  methods: {
    // 图片预览
    downloadFile(fullName) {
      if (fullName)
        window.open(fullName)
    },

    // 删除图片
    async deleteFile(shortName, index) {
      let res = await this.$http.get('/file/delete/full', { url: shortName })
      if (res.errorCode === 0) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.value.splice(index, 1)
        this.$emit('input', this.value)
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
.file-word {
  line-height: 130%;
}

.btn-box {
  min-width: 20px;
  min-height: 40px;
}
</style>
