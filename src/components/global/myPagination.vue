<template>
  <div class="we-width-100pc we-padding we-border-top-1 we-font-right">
    <el-pagination background :total="total" :page-size="pageSize" :page-sizes="pageSizes" :pager-count="pagerCount" :layout="layout"
      :current-page="currentPage" @size-change="sizeChange" @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: function () {
        return [5, 10, 20, 30, 40, 50, 100, 500]
      }
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    layout: {
      type: String,
      default: 'sizes,prev,pager,next,jumper,total'
    },
    currentPage: {
      type: Number,
      default: 1,
    }
  },
  data() {
    return {

    }
  },
  methods: {
    // 每页几条改变
    sizeChange(value) {
      this.$emit('sizeChange', value)
    },

    // 当前页数改变
    currentChange(value) {
      this.$emit('currentChange', value)
    },
    
  }
}
</script>