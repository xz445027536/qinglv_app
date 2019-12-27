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
    url: '/homepage/saveBanner',
    method: 'post',
    data: params
  })
}

/**
 * 获取热门方案列表
 */
export function getBannerSolutions() {
  return request({
    url: '/homepage/getBannerSolutions',
    method: 'post'
  })
}

/**
 * 删除热门方案
 * @param params
 */
export function deleteBannerSolution(params) {
  return request({
    url: '/homepage/deleteBannerSolution',
    method: 'post',
    data: params
  })
}

/**
 * 新增或修改热门方案
 * @param params
 */
export function saveAndUpdateBannerSolution(params) {
  return request({
    url: '/homepage/saveAndUpdateBannerSolution',
    method: 'post',
    data: params
  })
}

/**
 * 获取方案
 */
export function queryBannerSolutionData() {
  return request({
    url: '/homepage/queryAddBannerSolutionData',
    method: 'get'
  })
}

/**
 * 获取特色包材
 */
export function getBannerMats() {
  return request({
    url: '/homepage/getBannerMats',
    method: 'post'
  })
}

/**
 * 删除特色包材
 */
export function deleteBannerMats(params) {
  return request({
    url: '/homepage/deleteBannerMats',
    method: 'post',
    data: params
  })
}

/**
 * 新增特色包材
 */
export function saveAndUpdateBannerMats(params) {
  return request({
    url: '/homepage/saveAndUpdateBannerMats',
    method: 'post',
    data: params
  })
}

/**
 * 获取包材
 */
export function getPackMats() {
  return request({
    url: '/homepage/getPackMats',
    method: 'get'
  })
}

/**
 * 富文本上传图片
 */
export function uploadPic(params) {
  return request({
    url: '/homepage/uploadPic',
    method: 'post',
    data: params
  })
}