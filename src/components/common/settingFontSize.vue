<template>
  <div class="setting-font-size-container">
    <p>字体大小</p>
    <div class="step-box">
      <el-slider v-model="fontSizeValue" :step="2" :min="12" :max="18" show-stops @change="onChange">
      </el-slider>
      <!-- 字体描述 -->
      <span style="font-size: 12px;" @click="onChange(12)" class="step-word word-small" :class="{'step-word-active': fontSizeValue == 12}">小</span>
      <span style="font-size: 14px;" @click="onChange(14)" class="step-word word-normal" :class="{'step-word-active': fontSizeValue == 14}">标准</span>
      <span style="font-size: 16px;" @click="onChange(16)" class="step-word word-large" :class="{'step-word-active': fontSizeValue == 16}">大</span>
      <span style="font-size: 18px;" @click="onChange(18)" class="step-word word-larger" :class="{'step-word-active': fontSizeValue == 18}">超大</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fontSizeValue: 14
    }
  },
  created() {
    let fontSizeValue = localStorage.getItem('fontSizeValue')
    if (fontSizeValue) this.fontSizeValue = parseInt(fontSizeValue)
  },
  methods: {
    onChange(e) {
      this.fontSizeValue = e
      localStorage.setItem('fontSizeValue', e)
      document.getElementsByTagName('body')[0].style.setProperty('--smallerFont', this.fontSizeValue - 4 + 'px')
      document.getElementsByTagName('body')[0].style.setProperty('--smallFont', this.fontSizeValue - 2 + 'px')
      document.getElementsByTagName('body')[0].style.setProperty('--normalFont', this.fontSizeValue + 'px')
      document.getElementsByTagName('body')[0].style.setProperty('--largeFont', this.fontSizeValue + 2 + 'px')
      document.getElementsByTagName('body')[0].style.setProperty('--largerFont', this.fontSizeValue + 4 + 'px')
      document.getElementsByTagName('body')[0].style.setProperty('--font20', this.fontSizeValue + 6 + 'px')
      document.getElementsByTagName('body')[0].style.setProperty('--font13', this.fontSizeValue - 1 + 'px')
      // document.documentElement.style.fontSize = this.fontSizeValue + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-font-size-container {
  width: 100%;
  padding-left: 80px;
  padding-top: 20px;
  box-sizing: border-box;

  .step-box {
    margin-top: 50px;
    width: 80%;
    position: relative;

    .step-word {
      position: absolute;
      top: -16px;
      white-space: nowrap;
      color: $tipColor;
      cursor: pointer;
    }

    .step-word-active {
      color: $blue;
    }

    .word-small {
      left: -2px;
    }

    .word-normal {
      left: 30%;
    }

    .word-large {
      left: 64%;
    }

    .word-larger {
      left: 95%;
    }
  }
}
</style>


