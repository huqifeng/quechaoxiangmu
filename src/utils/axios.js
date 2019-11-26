/**
 * http请求拦截器
 */

import axios from 'axios'
// import router from '@/router'
import qs from 'qs'
import {
  getSessionStorage
} from '@/utils/util'
import {
  Toast
} from 'vant'

class HttpRequest {
  constructor() {
    this.queue = {}
  }
  getInsideConfig(data) {
    const config = {
      baseURL: '/api/', // 开发环境
      // baseURL: '/', // 打包
      headers: {
        //
      }
    }
    if (data) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // store.commit('setLoading', false)
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      let token = getSessionStorage('token')
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
        config.headers['Accept'] = 'application/json'
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })

    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const data = res.data
      /**
       * code 状态说明
       * 500 服务处理错误
       * 200 请求成功
       * 100 警告（参数错误）
       * 401 未授权
       * 4 没有登录
       */
      if (data.code !== 200) {
        if (data.code === 300) {
          Toast.fail(data.msg || 'error')
        } else if (data.code === 401) {
          Toast.fail(data.msg || 'error')
        } else if (data.code === 301) {
          Toast.fail(data.msg || 'error')
        } else {
          Toast.fail(data.msg || 'error')
        }
        return Promise.reject(data)
      } else {
        return data
      }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const {
          request: {
            statusText,
            status
          },
          config
        } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: {
            responseURL: config.url
          }
        }
      }
      Toast.fail(errorInfo.statusText || 'error')
      return Promise.reject(error)
    })
  }
  request(options) {
    // 判断ie浏览器,统一加时间戳
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Trident') > -1 && options.method === 'get') {
      options.url += '?date=' + new Date().getTime()
    }
    const instance = axios.create()
    if (options.formdata) {
      options.data = qs.stringify(options.data)
    }
    options = Object.assign(this.getInsideConfig(options.formdata), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
