<template>
  <div class="upload-file-container">
    <el-upload :action="baseUrl" :show-file-list="false" drag :multiple="false" accept=".pdf,.txt,.doc,.docx,.xls,.xlsx,.zip,.rar"
      :before-upload="beforeUpload" :on-success="handleThumbnailSuccess">
      <p>将附件拖拽至此区域 或 <span class="we-color-blue">点击上传</span></p>
      <p class="we-tip">仅支持pdf、txt、doc、docx、xls、xlsx、zip、rar格式</p>
    </el-upload>

  </div>
</template>

<script>
import config from '@/config/config'
export default {
  data() {
    return {
      baseUrl: config.baseUrl + '/file/upload/full',
    }
  },
  methods: {
    // 上传前校验格式
    beforeUpload(file) {
      let fileName = file.name
      let index = fileName.lastIndexOf('.')
      if (index === -1) {
        this.$message('格式不正确')
        return false
      }
      let suffix = fileName.substring(index + 1)
      return true
    },

    // 缩略图上传成功
    handleThumbnailSuccess(res) {
      if (res.errorCode === 0 && this._.isObject(res.data))
        this.$emit('confirm', res.data)
    },
  }
}
</script>

<style lang="scss">
.upload-file-container {
  width: 100%;

  .el-upload {
    display: block;
  }
  .el-upload-dragger {
    width: 100%;
    height: 75px;
    background: $colorD9;
  }
}
</style>
