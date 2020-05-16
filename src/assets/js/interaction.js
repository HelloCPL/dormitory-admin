import {
  Message
} from 'element-ui'
import _ from 'lodash'

// 重写消息提示
export const message = (params) => {
  if (_.isObject(params) && params) {
    if (!_.isBoolean(params.showClose))
      params.showClose = true
      Message(params)
  } else if(_.isString(params) && params) {
    let obj = {
      message: params,
      showClose: true
    }
    Message(obj)
  }
}