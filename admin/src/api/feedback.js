import request from '../utils/request'

export function getFeedbackList(params) {
  return request({
    url: '/suggestionFeedback/getFeedbackList',
    method: 'post',
    data: params
  })
}