import request from '@/utils/request'

/**
 *  特色包材详情
 */
export function getPackMats(params) {
  return request({
    url: '/homepage/getMatInfo',
    method: 'post',
    data: params
  })
}

/**
 * 获取推荐材料
 */
export  function getRecommendMats(params) {
  return request({
    url: '/homepage/getSugstMats',
    method: 'post',
    data: params
  })
}