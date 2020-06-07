<template>
  <div class="we-color-white home-header">
    <!-- 背景图片 -->
    <div class="header-bg">
      <img src="@img/icon_home_bg.png" alt="">
    </div>
    <!-- 头部信息 -->
    <div class="we-flex-jc-ai header-box">
      <div class="we-flex-ai">
        <img src="@img/icon_user_white.png" alt="" class="left-icon">
        <span class="we-font-20 we-padding-left-20">广东技术师范大学</span>
      </div>
      <div class="we-flex-ai right">
        <img src="@img/avatar.png" alt="" class="right-icon">
        <span class="we-font-14 we-padding-left-10 we-pointer" @click="onTest">梁婉鸣</span>
        <span class="we-font-14 we-padding-left-10 we-pointer">退出</span>
      </div>
    </div>
    <!-- 主体导航 -->
    <div class="we-flex-ai main-nav" :class="{'main-nav-active': !show}">
      <template v-for="(item, index) in menus">
        <div class="nav-item" :key="index">
          <span class="we-pointer" :class="{'active': active == index}" @click="setActive(index, item)">{{item.title}}</span>
        </div>
      </template>
    </div>

    <!-- 收起或展开 -->
    <img src="@img/icon_arrow_white.png" :title="show ? '收起' : '展开'" class="we-pointer icon_arrow" :class="{'icon_arrow_active': !show}" @click="show = !show" />

  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data() {
    return {
      active: 0,
      show: true, // 是否展示
    }
  },
  computed: {
    ...mapGetters(['menus'])
  },
  methods: {
    ...mapActions(['initRoute', 'setSubMenus']),

    // 设置点击项 并跳转
    setActive(index, item) {
      if(index === this.active) return
      // 清除二级路由
      this.initRoute()
      this.active = index
      this.setSubMenus(index)
      let routeName = item.module[0]['routeName']      
      let status = item.status
      if(status) {
        this.routerPush({
          name: routeName
        })
      } else {
        this.$router.push({
          name: routeName
        })
      }
    },

    // 仅测试用
    async onTest() {
      let params = {
        // ids: '10,11,12,20',
        // id: 6,
        // keyCode: 1,
        // checkTime: 158937490999,
        // startTime: 158937490999,
        // endTime: 1589374919999,
        // isPublic: 0,
        // isTop: 1,
        // sort: 22,
        // type: 3,
        // desc: '描述5555',
        // content: '内容1111',
        // title: '标题',
        // price: 123.12,
        // scope: 5,
        // remark: '说明555',
        // url: 'tr7oy1587543841731.jpg',
        // fileUrl: 'tr7oy1587543841731.jpg',
        // keyword: '大',
        // timeStatus: 0,
        // isTop: 1
        // type: 3,
        // pageSize: 2,
        // keyword: '桌子',
        // dorBuildingId: 1,
        // dorRoomId: 1,
        // status: 0,
        // repairTime: 158937490999,
        // repairWorker: '张的',
        // type: '1,2'
        // replyStatus: 2,
        // replyContent: '内容sdfsd',
        // remark: '备注说明',
        // pageSize: 2
      }
      let res = await this.$http.post('/doraffair/payment/list', params)
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./home-header.scss";
</style>
