import request from '@/utils/request'

/**
 * 获取banner列表
 */
export function getBanner(params) {
  return request({
    url: '/homepage/getBanner',
    method: 'post',
    params: params
  })
}

/**
 * 删除banner
 * @param params
 */
export function delBanner(params) {
  return request({
    url: '/homepage/delBanner',
    method: 'post',
    data: params
  })
}

/**
 * 更新banner
 * @param params
 */
export function saveBanner(params) {
  return request({
    url: '/homepage/saveBannerWeb',
    method: 'post',
    data: params
  })
}