import request from '@/utils/request'

export function fetchDemandData(params) {
  return request({
    url: '/require/query',
    method: 'post',
    data: params
  })
}

export function getDemandDetail(id) {
  return request({
    url: '/require/detail',
    method: 'post',
    data: { id }
  })
}

export function getDemandUsers(params) {
  return request({
    url: '/require/users',
    method: 'post',
    data: params
  })
}

export function getDemandTitles(params) {
  return request({
    url: '/require/titles',
    method: 'post',
    data: params
  })
}

export function exportDemand(params) {
  location.href = `${process.env.BASE_API}/require/downs?status=&userKey=&title=&start=&end=` + '&userCode=' + params.userCode + '&role=' + params.role
  // return request({
  //   url: '/require/downs',
  //   method: 'get',
  //   params: params
  // })
}

export function handleDemandProcess(params) {
  return request({
    url: '/require/handle',
    method: 'post',
    data: params
  })
}

export function getRequireStatus() {
  return request({
    url: '/configure/requireStatus',
    method: 'post'
  })
}

export function getRequireType() {
  return request({
    url: '/configure/requireType',
    method: 'post'
  })
}

/**
 * 获取需求承接人
 */
export function getAccepter() {
  return request({
    url: '/require/getAccepter',
    method: 'post'
  })
}
