<template>
  <div class="add-box" v-if="dataInfo && dataInfo.id">
    <el-form ref="formName" :model="dataInfo" label-position="left" label-width="100px" class="we-flex-wrap we-padding">
      <el-form-item label="评价时间" prop="startTime" class="we-width-300 we-margin-right-20">
        <p>{{dataInfo.evaluationTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}</p>
      </el-form-item>
      <el-form-item label="评价内容" prop="startTime" class="we-width-100pc">
        <p>{{dataInfo.evaluationContent}}</p>
      </el-form-item>
      <el-form-item label="评价等级" prop="startTime" class="we-width-300 we-margin-right-20">
        <p v-if="dataInfo.evaluationScope == 1" class="we-color-red">非常差</p>
        <p v-else-if="dataInfo.evaluationScope == 2" class="we-color-tip">差</p>
        <p v-else-if="dataInfo.evaluationScope == 3">合格</p>
        <p v-else-if="dataInfo.evaluationScope == 4" class="we-color-orange">良好</p>
        <p v-else-if="dataInfo.evaluationScope == 5" class="we-color-green">优秀</p>
      </el-form-item>
    </el-form>
    <div class="we-border-top-1 we-padding we-bg-white">
      <el-button type="primary" @click="onConfirm" :disabled="!dataInfo.id">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },

  methods: {
    // 提交
    onConfirm() {
      this.$emit('confirm')
    },
  },

  watch: {
    dataInfo: {
      handler(val, oldVal) {
        if (val === oldVal) return
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.add-box {
  width: 600px;
}
</style>
