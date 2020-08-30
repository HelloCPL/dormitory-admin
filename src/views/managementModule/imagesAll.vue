<template>
  <div class="we-width-100pc we-padding-top-20" @mousewheel="listenScroll">
    <div class="we-flex-wrap">
      <div class="we-flex-jc-ai we-margin-left-15 we-margin-bottom-15 water-full-box" v-for="(item, index) in dataList"
        :key="index" @click="previewImg(item)">
        <img :src="item.url.fullName" alt="">
        <div class="we-padding-left-5 we-padding-right-5 we-color-white we-font-12 we-line-2 water-full-box-word">{{item.desc}}</div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" :title="dialogImageTitle">
      <div>
        <img width="100%" :src="dialogImageUrl" alt="">
        <p class="we-tip we-margin-top-10">{{dialogImageDesc}}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'imagesAll',
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      finish: false,
      lock: false,
      lockMore: false,
      dialogVisible: false,
      dialogImageUrl: null,
      dialogImageDesc: null,
      dialogImageTitle: null,
      dataList: []
    }
  },
  created() {
    this.onRefresh()
  },
  methods: {
    listenScroll(e) {
      if (this.lockMore || this.finish) return
      this.lockMore = true
      let ele = e.scrElement || e.target
      if (ele.scrollTop + ele.offsetHeight >= ele.scrollHeight) {
        this.getDataList()
      }
      setTimeout(() => {
        this.lockMore = false
      }, 100)
    },

    // 更新
    onRefresh() {
      this.pageNo = 1
      this.pageSize = 10
      this.finish = false
      this.lock = false
      this.getDataList()
    },

    // 加载更多数据
    async getDataList() {
      if (this.lock || this.finish) return
      if (this.pageNo == 1) this.dataList = []
      this.lock = true
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }
      let res = await this.$http.post('/management/images/list', params)
      if (res.errorCode === 0) {
        let data = res.data || []
        this.dataList = this.dataList.concat(data)
        this.pageNo++
        if (this.dataList.length >= res.total) this.finish = true
      }
      this.lock = false
    },

    // 图片预览
    previewImg(item) {
      this.dialogVisible = true
      this.dialogImageUrl = item.url.fullName
      this.dialogImageDesc = item.desc
      switch (item.type) {
        case 1:
          this.dialogImageTitle = '轮播图'
          break
        case 2:
          this.dialogImageTitle = '宿舍相关信息图'
          break
        case 3:
          this.dialogImageTitle = '宿舍相关信息图'
          break
        case 4:
          this.dialogImageTitle = '其他图片'
          break
      }
    },
  },

}
</script>

<style lang="scss" scoped>
@import "./imagesAll.scss";
</style>
