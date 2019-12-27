import request from '../utils/request'

/**
 * 获取包装配置中的物品类别
 */
export function getMatNames() {
  return request({
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    url: '/carbondial/getMatNames',
    method: 'get'
  })
}

/**
 * 根据物品类别获取类别规格数据
 */
export function getCategorys(params) {
  return request({
    headers : {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    url: '/carbondial/getCategorys',
    method: 'post',
    data: params
  })
}

/**
 * 单票物流碳排测算
 */
export function calculateByNo(params) {
  return request({
    headers : {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    url: '/carbondial/calculateByNo',
    method: 'post',
    data: params
  })
}

/**
 * 未发生业务碳排测算
 */
export function searchFlow(srcCityCode,destCityCode) {
  return request({
    headers : {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    url: '/carbondial/searchFlow?srcCityCode='+srcCityCode + '&destCityCode=' + destCityCode,
    method: 'get',
  })
}

/**
 * 查询省的数据
 */
export function getProvinces() {
  return request({
    headers : {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    url: '/carbondial/getProvinces',
    method: 'get',
  })
}

/**
 * 查询城市的数据
 */
export function getCitys(provinceCode) {
  return request({
    headers : {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    url: '/carbondial/getCitys?provinceCode='+provinceCode,
    method: 'get'
  })
}

/**
 * 结果列表
 */
export function queryFileList(params) {
  return request({
    headers : {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    url: '/carbondial/queryFileList',
    method: 'post',
    data:params
  })
}

/**
 * 删除结果列表
 */
export function deleteDown(id) {
  return request({
    headers : {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    url: '/carbondial/deleteDown?id='+id,
    method: 'delete',
  })
}

/**
 * 查询待下载文件数量
 */
export function getNumsUndown() {
  return request({
    headers : {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    url: '/carbondial/getNumsUndown',
    method: 'get',
  })
}

/**
 * 更新下载数量
 */
export function updateNumById(id) {
  return request({
    // headers : {
    //   'Content-Type': 'application/json;charset=UTF-8'
    // },
    url: '/carbondial/updateNumById?id='+id,
    method: 'get',
  })
}