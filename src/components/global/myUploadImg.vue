<template>
  <div class="we-flex-ai my-upload-img-container">
    <el-upload :action="baseUrl" :show-file-list="false" :multiple="false" accept="image/*" :on-success="handleThumbnailSuccess">
      <el-button class="btn-word">
        <span class="we-flex-jc-ai">
          <img src="@img/icon_upload.png" alt="" class="we-width-18 we-margin-right-5">
          <span class="we-font-12">点击上传</span>
        </span>
      </el-button>
    </el-upload>
    <p class="we-margin-left-10 we-tip">支持扩展名：jpg、jpeg、png...</p>
  </div>
</template>

<script>
import config from '@/config/config'
export default {
  data() {
    return {
      baseUrl: config.baseUrl + '/file/upload',
    }
  },
  methods: {
    // 缩略图上传成功
    handleThumbnailSuccess(res) {
      if (res.errorCode === 0 && this._.isObject(res.data))
        this.$emit('confirm', res.data)
    },
  }
}
</script>

<style lang="scss" scoped>
.my-upload-img-container {
  width: 100%;

  .btn-word {
    color: $tipColor;

    &:hover {
      color: $blue;
    }
  }
}
</style>
