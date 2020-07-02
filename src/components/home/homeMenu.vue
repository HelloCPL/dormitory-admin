<template>
  <div class="we-height-100pc we-padding-top-15 we-scroll-y-0 we-title we-bg-white home-menu">
    <div v-for="(item, index) in menuItem" :key="index + 'a'">
      <div class="we-line-1 we-pointer menu-item" :class="{'menu-item-active': menuActive === item.to}" v-if="!item.children.length"
        @click="onSelected(item)">{{item.name}}</div>
      <!-- 子菜单 -->
      <div v-else>
        <div class="we-line-1 we-relative menu-item" @click="onSubmenu(item)">
          <span>{{item.name}}</span>
          <img src="@img/icon_menu.png" alt="" class="menu-img" :class="{'menu-img-active': item.show}" />
        </div>
        <el-collapse-transition>
          <div v-show="item.show">
            <div class="we-line-1 we-pointer menu-item menu-item-submenu" :class="{'menu-item-active': menuActive === list.to}"
              v-for="(list, listIndex) in item.children" :key="listIndex + 'b'" @click="onSelected(list)">{{list.name}}</div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  
  props: {
    menus: {
      type: Array,
      default: function () {
        return []
      }
    },
    activeTo: {
      type: [String, Number],
    }
  },
  data() {
    return {
      menuItem: [],
      menuActive: ''
    }
  },
  computed: {
    ...mapGetters(['currentMenu'])
  },
  methods: {
    // 选择
    onSelected(item) {
      if (this.menuActive === item.to) return
      this.menuActive = item.to
      this.$emit('onRowClick', item)
    },

    // 打开二级菜单
    onSubmenu(data) {
      for (let i = 0, len = this.menuItem.length; i < len; i++) {
        if (this.menuItem[i]['menuId'] === data.menuId) {
          let show = this.menuItem[i]['show'] || false
          this.$set(this.menuItem[i], 'show', !show)
        }
      }
    }
  },
  watch: {
    menus: {
      handler(val, oldVal) {
        this.menuItem = this._.cloneDeep(val)
      },
      deep: true
    },
    activeTo(val, oldVal) {
      if (val === oldVal) return
      this.menuActive = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./homeMenu.scss";
</style>


