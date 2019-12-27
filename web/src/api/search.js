import request from '../utils/request'

/**
 * 搜索框实时提示
 */
export function searchHint(params) {
  return request({
    url: '/search/searchHint',
    method: 'post',
    data: params
  })
}

/**
 * 搜索(显示方案列表)
 */
export function searchList(params) {
  return request({
    url: '/search/searchList',
    method: 'post',
    data: params
  })
}