import request from '@/utils/request'

/* 权限管理相关 api (auth) */

/**
 * 获取人员列表
 * @param role
 */
export function getPersonnelList(role) {
  const params = {}
  Object.assign(params, { role })
  return request({
    url: '/manager/findByPage',
    method: 'post',
    data: params
  })
}

/**
 * 添加人员
 * @param params
 */
export function addPersonnel(params) {
  return request({
    url: '/manager/addManager',
    method: 'post',
    data: params
  })
}

/**
 * 删除人员
 * @param id
 */
export function deletePersonnelById(id) {
  return request({
    url: '/manager/delManager',
    method: 'post',
    data: [id]
  })
}

/**
 * 获取当前登录用户角色
 */
export function getCurrentUserRole(userCode) {
  return request({
    url: '/manager/getRole',
    method: 'post',
    data: { userCode }
  })
}