<template>
  <div class="we-width-100pc we-border-bottom-1 we-flex">
    <div class="we-flex-1 we-padding">
      <el-form ref="form" :model="dataInfo" label-position="left" label-width="100px" class="we-flex-wrap">
        <el-form-item label="关键字" class="we-width-300 we-margin-right-20">
          <el-input v-model="dataInfo.keyword" prefix-icon="el-icon-search" placeholder="请输入关键字" clearable></el-input>
        </el-form-item>
        <el-form-item label="展示状态" class="we-width-300 we-margin-right-20">
          <el-select v-model="dataInfo.timeStatus" clearable placeholder="请选择">
            <el-option v-for="item in filterData.timeStatusList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否公开" class="we-width-300 we-margin-right-20">
          <el-select v-model="dataInfo.isPublic" clearable placeholder="请选择">
            <el-option v-for="item in filterData.publicList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否置顶" class="we-width-300 we-margin-right-20">
          <el-select v-model="dataInfo.isTop" clearable placeholder="请选择">
            <el-option v-for="item in filterData.topList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" class="we-width-300 we-margin-right-20">
          <el-select v-model="dataInfo.type" multiple clearable placeholder="请选择">
            <el-option v-for="item in filterData.typeList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
    </div>

    <div class="we-padding">
      <el-button type="primary" @click="onConfirm">搜索</el-button>
      <el-button @click="onCancel">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataInfo: {
        keyword: '',
        timeStatus: null, // 展示状态
        isPublic: null,
        isTop: null,
        type: [], // 类型 多选
      },
      filterData: {
        timeStatusList: [{ id: 1, name: '正在展示' }, { id: 2, name: '未开始' }, { id: 0, name: '已过期' }],
        publicList: [{ id: 1, name: '公开' }, { id: 0, name: '不公开' }],
        topList: [{ id: 1, name: '置顶' }, { id: 0, name: '不置顶' }],
        typeList: [{ id: 1, name: '公告' }, { id: 2, name: '日程管理' }, { id: 3, name: '管理规定' }, { id: 4, name: '服务指南' }, { id: 5, name: '安全指示' }, { id: 6, name: '中心简介' }]
      },
    }
  },
  methods: {
    // 确认
    onConfirm() {
      this.$emit('confirm', this.dataInfo)
    },

    // 取消
    onCancel() {
      this.dataInfo.keyword = ''
      this.dataInfo.timeStatus = null
      this.dataInfo.isPublic = null
      this.dataInfo.isTop = null
      this.dataInfo.type = []
    }
  }
}
</script>
