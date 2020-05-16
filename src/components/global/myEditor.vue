<template>
  <div>
    <vue-ueditor-wrap v-model="msg"
                      :config="myConfig"></vue-ueditor-wrap>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    ueHeight: {
      type: Number,
      default: 400
    }
  },
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      msg: this.msg,
      myConfig: {
        // 是否跟随内容撑开
        autoHeightEnabled: false,
        elementPathEnabled: false,
        wordCount: false,
        // 高度
        initialFrameHeight: this.ueHeight,
        // 宽度
        initialFrameWidth: '100%',
        // 资源依赖的路径
        UEDITOR_HOME_URL: '/UEditor/',
        // 图片上传的路径
        serverUrl: `/api/ueditor/upload`,
        // serverUrl: `http://192.168.1.120/lzt/ueditor/exec`,
        // 鼠标右键的功能，但是一般不用编辑器带的功能，因为编辑器自带的不能右键复制，所以这个变量设置为空数组
        contextMenu: [],
        lineheight: [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4],
        autotypeset: {
          mergeEmptyline: true, // 合并空行
          removeClass: true, // 去掉冗余的class
          removeEmptyline: false, // 去掉空行
          textAlign: 'left', // 段落的排版方式，可以是 left,right,center,justify 去掉这个属性表示不执行排版
          imageBlockLine: 'center', // 图片的浮动方式，独占一行剧中,左右浮动，默认: center,left,right,none 去掉这个属性表示不执行排版
          pasteFilter: false, // 根据规则过滤没事粘贴进来的内容
          clearFontSize: false, // 去掉所有的内嵌字号，使用编辑器默认的字号
          clearFontFamily: false, // 去掉所有的内嵌字体，使用编辑器默认的字体
          removeEmptyNode: false, // 去掉空节点
          // 可以去掉的标签
          removeTagNames: { 标签名字: 1 },
          indent: true, // 行首缩进
          indentValue: '2em', // 行首缩进的大小
          bdc2sb: false,
          tobdc: false
        }
      }
    }
  },
  watch: {
    msg(val, oldVal) {
      if(val === oldVal) return
      this.$emit('input', val)
    },
    value(val, oldVal) {
      if(val === oldVal) return
      this.msg = val
    }
  }
  
}
</script>

