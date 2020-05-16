// Vue 过滤器

import Vue from 'vue'
import dayjs from 'dayjs'

// 时间格式过滤器 
Vue.filter('dateFormat', (value, format) => {
  if(!value) return ''
  let target = dayjs(value).format(format)
  return target || ''
})

