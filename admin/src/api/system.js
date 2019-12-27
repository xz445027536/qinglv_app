import request from '@/utils/request'

/* 系统管理相关 api (personnel, role, resource) */

/* 以下为人员管理相关 api (personnel) */

// /**
//  * 获取人员列表
//  * @param offset
//  * @param pageSize
//  */
// export function getPersonnelList(offset, pageSize) {
//   return request({
//     url: '/user/selectByExample',
//     method: 'get',
//     params: {
//       offset,
//       pageSize
//     }
//   })
// }

/**
 * 根据 id 查询单个人员信息
 * @param id
 */
export function getPersonnelDetail(id) {
  return request({
    url: '/user/selectByPrimaryKey',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新单个人员信息
 * @param params
 */
export function updatePersonnel(params) {
  return request({
    url: '/user/updateByPrimaryKeySelective',
    method: 'post',
    params: params
  })
}

/**
 * 新增人员
 * @param params
 */
export function insertPersonnel(params) {
  return request({
    url: '/user/insert',
    method: 'post',
    params: params
  })
}

/**
 * 根据 id 删除人员
 * @param id
 */
export function deletePersonnel(id) {
  return request({
    url: '/user/deleteByPrimaryKey',
    method: 'post',
    params: { id }
  })
}

/**
 * 获取人员相关的所有角色
 * @param userUid
 */
export function getRolesByUserUid(userUid) {
  return request({
    url: '/role/getAllRoleByUserNo',
    method: 'get',
    params: { userUid }
  })
}

export function changeBindState(params) {
  return request({
    url: '/role/changeUserRole',
    method: 'get',
    params: params
  })
}

/* 以下为角色管理相关 api (role) */

/**
 * 获取角色列表
 * @param offset
 * @param pageSize
 */
export function getRoleList(offset, pageSize) {
  return request({
    url: '/role/selectByExample',
    method: 'get',
    params: {
      offset,
      pageSize
    }
  })
}

/**
 * 根据 id 获取角色详情
 * @param id
 */
export function getRoleDetail(id) {
  return request({
    url: '/role/selectByPrimaryKey',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新单个角色信息
 * @param params
 */
export function updateRole(params) {
  return request({
    url: '/role/updateByPrimaryKeySelective',
    method: 'post',
    params: params
  })
}

/**
 * 删除角色
 * @param id
 */
export function deleteRole(id) {
  return request({
    url: '/role/deleteByPrimaryKey',
    method: 'post',
    params: { id }
  })
}

/**
 * 新增角色
 * @param params
 */
export function insertRole(params) {
  const formData = new FormData()
  formData.append('params', JSON.stringify(params))
  return request({
    url: '/role/insert',
    method: 'post',
    params: params
  })
}

/**
 * 获取资源节点列表
 */
export function getResourceList() {
  return request({
    url: '/resource/getResourceList',
    method: 'get'
    // params: { id }
  })
}

/* 以下为资源管理相关 api (role) */

/**
 * 插入资源节点
 * @param params
 */
export function insertResourceNode(params) {
  return request({
    url: '/resource/insert',
    method: 'post',
    params: params
  })
}

/**
 * 更新资源节点
 * @param params
 */
export function updateResourceNode(params) {
  return request({
    url: '/resource/updateByPrimaryKeySelective',
    method: 'post',
    params: params
  })
}

/**
 * 删除资源节点
 * @param id
 */
export function deleteNodeById(id) {
  return request({
    url: '/resource/deleteByPrimaryKey',
    method: 'post',
    params: { id }
  })
}

/**
 * 获取角色对应资源列表
 * @param roleId
 */
export function getRoleResourceList(roleId) {
  return request({
    url: '/resource/getRoleResource',
    method: 'get',
    params: { roleId }
  })
}

/**
 * 更新角色对应资源列表
 * @param params
 */
export function updateRoleResource(params) {
  return request({
    url: '/resource/updateRoleResource',
    method: 'post',
    params: params
  })
}

/**
 * 获取开关列表
 * @param switchKey
 */
export function getSwitchList(switchKey) {
  return request({
    url: '/switch/search',
    method: 'get',
    params: { switchKey }
  })
}

/**
 * 获取开关详情
 * @param switchId
 */
export function getSwitchDetail(switchId) {
  return request({
    url: '/switch/detail',
    method: 'get',
    params: { switchId }
  })
}

/**
 * 根据 id 删除开关
 * @param id
 */
export function deleteSwitch(id) {
  return request({
    url: '/switch/del',
    method: 'post',
    params: { id }
  })
}

/**
 * 添加(不传 id)/修改开关(传 id)
 * @param params
 */
export function upsertSwitch(params) {
  return request({
    url: '/switch/upsert',
    method: 'post',
    params: params
  })
}
