import request from '@/utils/request'

/**
 *  意见反馈
 */
export function feedback(params) {
  return request({
    url: '/feedback/save',
    method: 'post',
    data: params
  })
}