import request from '@/utils/request'

// import config from '../config/index'

/**
 * 需求上报
 * @param params
 */
export function requireCommit(params) {
  return request({
    url: '/require/commit',
    method: 'post',
    data: params
  })
}

export function requireRecommit(params) {
  return request({
    url: '/require/recommit',
    method: 'post',
    data: params
  })
}

export function getrequireCount() {
  return request({
    url: '/require/count',
    method: 'post'
  })
}

export function getRequireTitles() {
  return request({
    url: '/require/titles',
    method: 'post'
  })
}

export function getRequireList(params) {
  //过滤后端不支持的不合法progStatus（主要针对查询全部状态时）
  if (params.progStatus && Number(params.progStatus) < 0) {
    params.progStatus = ''
  }
  return request({
    url: '/require/list',
    method: 'post',
    data: params
  })
}

export function getRequireDetail(params) {
  return request({
    url: '/require/detail',
    method: 'post',
    data: params
  })
}

export function rejectRequire(params) {
  return request({
    url: '/require/reject',
    method: 'post',
    data: params
  })
}

export function confirmRequire(params) {
  return request({
    url: '/require/confirm',
    method: 'post',
    data: params
  })
}

export function setMessage(params) {
  return request({
    url: '/msgcenter/setRedTag',
    method: 'post',
    data: params
  })
}

export function exportList(params) {
  //过滤后端不支持的不合法progStatus（主要针对查询全部状态时）
  if (params.progStatus && Number(params.progStatus) < 0) {
    params.progStatus = ''
  }
  location.href = `${process.env.VUE_APP_BASE_URL}require/expList?` + 'progStatus=' + params.progStatus + '&title=' + params.title

}
