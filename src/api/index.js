import axios from 'axios'
import Qs from 'qs'
import _ from 'lodash'
import {
  Base64
} from 'js-base64'
import store from '@/store/index'
import {
  message
}
from '@js/interaction'
import router from '@/router/index'

// 处理token加密
function _encode(isAuth) {
  const base64 = Base64.encode(isAuth + ':')
  return 'Basic ' + base64
}

import global from '@/config/config'
// 设置超时
// axios.defaults.baseUrl = baseUrl
axios.defaults.timeout = 15000

// 请求拦截器
axios.interceptors.request.use(config => {
  // 处理url
  config.url = global.baseUrl + config.url
  // 携带token
  let isAuth = store.getters.isAuth
  if (isAuth) {
    config.headers.Authorization = _encode(isAuth)
  }
  return config
})

// 响应拦截器
axios.interceptors.response.use(res => {
  let data = res.data
  if (res.status.toString().substr(0, 1) === '2') {
    if (data.errorCode === 0) {
      return Promise.resolve(data)
    } else if (data.errorCode === 403) {
      // token 失效 二次重发
      message({
        type: 'error',
        message: '令牌失效'
      })
      router.replace({
        name: 'login'
      })
    } else {
      let msg = '服务器发生错误'
      if (_.isString(data.msg) && data.msg) {
        msg = data.msg
      } else if (_.isArray(data.msg) && data.msg.length) {
        msg = data.msg[0]
      }
      message(msg)
      return Promise.resolve(data)
    }
  } else {
    message({
      type: 'error',
      message: '服务器发生错误，请开开心心的找后台人员协调'
    })
    return Promise.reject(data)
  }
})

// get 请求 
export const get = (url, params, config) => {
  config = config || {}
  config.params = params
  return new Promise((resolve, reject) => {
    axios.get(url, config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// post 请求 formData数据请求格式
export const post = (url, params, config) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params, config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// postform  Qs格式化数据
export const postStringify = (url, params, config) => {
  return new Promise((resolve, reject) => {
    axios.post(url, Qs.stringify(params), config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default {
  get,
  post,
  postStringify,
  // postform
}