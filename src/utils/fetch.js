import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '../store'
// import {getToken} from '@/utils/auth'
import router from '../router'

/*
 * axios封装
 *
 */

axios.defaults.withCredentials = true

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000                 // 请求超时时间
})

// request拦截器 添加token
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   let cc = getToken()
  //   console.log(cc)
  //   config.headers['X-Token'] = '123' // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data

    // 判断返回的code值是否正确
    if (res.code === 20000) {
      return res.data
    } else {
      MessageBox.confirm(res.data, {
        confirmButtonText: '确定',
        showCancelButton: false,
        type: 'warning'
      })
      store.dispatch('UpdateUserName')
      router.push('/')
      return Promise.reject(new Error(res.data))
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      // }
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
