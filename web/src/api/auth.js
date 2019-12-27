import request from '../utils/request'

/**
 * 获取当前登录用户角色
 */
export function getCurrentUserRole() {
  return request({
    url: '/manager/getRole',
    method: 'post'
  })
}