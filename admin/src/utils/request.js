import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
// import store from '../store'
import CAS from '@/utils/casLogin'
// import store from '@/store/index'
// import envConfig from '../utils/environment'
// import { getToken } from '@/utils/auth'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.GW_API, // api的base_url
  timeout: 15000 // 请求超时时间
  // headers: {
  //   // 'Content-Type': 'application/json'
  //   'sgs-userid': store.getters.name,

  // }

})

// request拦截器
service.interceptors.request.use(config => {
  // 在发送请求之前如果为post序列化请求参数
  // if (config.method === 'post') {
  //   config.data = qs.stringify(config.data)
  // }
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  console.log(config)
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// response 拦截器
service.interceptors.response.use(
  response => {
    // if (response.headers['content-disposition']) {
    //   console.log(response.headers['content-disposition'])
    //   return response
    // }
    const res = response.data
    if (res.status === 'SUCCESS') {
      return response.data
    } else if (res.errorCode === '405') {
      MessageBox.confirm('您没有操作权限', '提示', {
        closeOnClickModal: false,
        closeOnPressEscape: false,
        confirmButtonText: '退出登录',
        type: 'error',
        showClose: false,
        showCancelButton: false
      }).then(() => {
        CAS.casLogout()
      })
    } else {
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(res)
    }
  },
  error => {
    console.log('err: ', error)
    if (error.message !== 'Request failed with status code 401') { // 401错误交给网关cas处理
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }

    return Promise.reject(error)
  }
)

export default service
