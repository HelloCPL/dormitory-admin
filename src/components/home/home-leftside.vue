<template>
  <div class="we-border-right-1 we-scroll-y-0 we-bg-white home-leftside" :class="{'leftside-active': isCollapse}">
    <div class="we-flex-jc-ai leftside-nav">
      <span class="we-title" v-if="!isCollapse">导航栏</span>
      <img src="@img/icon_arrow_left.png" alt="" class="we-pointer" :class="{'img-active': isCollapse}" @click="isCollapse = !isCollapse">
    </div>

    <template v-if="subMenus.length">
      <el-menu :default-active="currentRoute" class="el-menu-vertical-demo" :collapse="isCollapse">
        <template v-for="(item, index) in subMenus">
          <el-menu-item :index="item.routeName" :key="item.routeName" @click="toRouter(item.routeName)">
            <i v-if="isCollapse">{{handleCollapseName(item.title)}}</i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      isCollapse: false, // 是否展开或折叠
    }
  },
  computed: {
    ...mapGetters(['subMenus', 'currentRoute', 'lastRoute'])
  },
  methods: {
    toRouter(routeName) {
      this.routerPush(routeName)
    },
    // 处理收起时文字显示
    handleCollapseName(title) {
      if (this._.isString(title)) {
        if (title.length < 2) {
          return title
        } else {
          let str = title.substr(title, 2)
          return str + '...'
        }
      } else {
        return title
      }
    }
  }
}
</script>

<style lang="scss">
.home-leftside {
  .el-menu {
    border: 0;
  }

  .el-menu-item.is-active {
    color: $blue;
    background: $bgBlue;
    border-right: 3px solid $blue;
  }
}
</style>


<style lang="scss" scoped>
@import "./home-leftside.scss";
</style>
