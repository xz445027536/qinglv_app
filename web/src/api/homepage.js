import request from '@/utils/request'

/**
 *  初始化首页数据
 */
export function initHomePage() {
  return request({
    url: '/homepage/initHomePage',
    method: 'post'
  })
}