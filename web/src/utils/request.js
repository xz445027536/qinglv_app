import axios from 'axios'
import { Message, Modal } from 'iview'
// import config from '../config/index'
import CAS from './casLogin'

const service = axios.create({
  // baseURL: `${config.CAS_URL}${config.API_BASE}`,
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 15000,
  // headers: {
  //   'sgs-userid': '01368081'
  // }
})

//request拦截
service.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

//response拦截
service.interceptors.response.use(response => {
  const res = response.data
  if (res.status === 'SUCCESS') {
    return response.data
  } else if (res.errorCode === '405') {
    Modal.error({
      title: '提示',
      content: '您没有操作权限',
      okText: '退出登录',
      onOk: () => {
        CAS.casLogout()
      },
    })
  } else if(res.status === 'ERROR'){
    return response.data
  }else {
    Message.error(res.message)
    return Promise.reject(res)
  }
}, error => {
  if (error.message !== 'Request failed with status code 401') { // 401错误交给网关cas处理
    Message.error(error.message)
  }
  return Promise.reject(error)
})

export default service