import request from '@/utils/request'

/* 方案&材料相关 api (material, scheme, classification, search) */

/* 以下为人材料配置相关 api (material) */

/**
 * 获取材料列表
 * @param params
 */
export function getMaterialList(params) {
  return request({
    url: '/material/selectMaterials',
    method: 'post',
    data: params
  })
}

/**
 * 获取单个材料配置详情
 * @param matId
 */
export function getMaterialDetail(matId) {
  return request({
    url: '/material/selectMaterialDetail',
    method: 'post',
    data: {
      matId
    }
  })
}

/**
 * 新建材料配置
 * @param form
 */
export function saveMaterial(form) {
  const data = {}
  console.log(data)
  Object.assign(data, form)
  const formData = new FormData()
  data.labels = JSON.stringify(data.labels)
  Object.keys(data).forEach(key => {
    formData.append(key, data[key])
  })

  return request({
    header: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/material/save',
    method: 'post',
    data: formData
  })
}

/**
 * 更新材料配置
 * @param form
 */
export function updateMaterial(form) {
  const data = {}
  Object.assign(data, form)
  const formData = new FormData()
  data.labels = JSON.stringify(data.labels)
  Object.keys(data).forEach(key => {
    formData.append(key, data[key])
  })
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/material/update',
    method: 'post',
    data: formData
  })
}

/**
 * 删除材料配置 支持多选删除
 * @param materialId
 */
export function deleteMaterial(materialId) {
  return request({
    url: '/material/delete',
    method: 'post',
    data: [{
      id: materialId
    }]
  })
}

/**
 * 材料配置导出
 */
export function exportMaterialToFile() {
  location.href = `${process.env.BASE_API}/material/down`
  // return request({
  //   url: '/material/down',
  //   method: 'get',
  //   responseType: 'blob'
  // })
}

/* 以下为方案配置相关 api (scheme) */

/**
 * 获取方案列表
 * @param params
 */
export function getSchemeList(params) {
  return request({
    url: '/solution/selectSolutions',
    method: 'post',
    data: params
  })
}

/**
 * 获取单个方案配置详情
 * @param solutionId
 */
export function getSchemeDetail(solutionId) {
  return request({
    url: '/solution/selectSolutionDetail',
    method: 'post',
    data: {
      solutionId
    }
  })
}

/**
 * 获取方案中可选的材料列表
 */
export function getMaterialOption() {
  return request({
    url: '/solution/selectMaterialList',
    method: 'post'
  })
}

/**
 * 删除方案配置 支持多选删除
 * @param solutionId
 */
export function deleteScheme(solutionId) {
  return request({
    url: '/solution/delete',
    method: 'post',
    data: [{
      id: solutionId
    }]
  })
}

/**
 * 上传包装过程视频文件
 * @param videoFile 视频文件 必须有
 * @param thumbnail 视频缩略图 可以没有
 * @param progress
 */
export function uploadPackingVideo(videoFile, thumbnail, progress) {
  const formData = new FormData()
  formData.append('packProcesVideo', videoFile)
  formData.append('packProcesVideoImg', thumbnail)
  return request({
    timeout: 60000,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/solution/videoUpload',
    method: 'post',
    onUploadProgress: progress,
    data: formData
  })
}

/**
 * 删除已上传视频
 * @param videoUrl 视频 url 必须有
 * @param thumbnailUrl 缩略图 url 可以没有
 */
export function deletePackingVideo(videoUrl, thumbnailUrl) {
  return request({
    url: '/solution/cancelVideoUpload',
    method: 'post',
    data: {
      packProcesVideoUrl: videoUrl,
      packProcesVideoImgUrl: thumbnailUrl
    }
  })
}

/**
 * 更新方案配置
 * @param formData
 */
export function updateScheme(formData) {
  // const formData = new FormData()
  // // form.labels = JSON.stringify(form.labels)
  // // form.materials = JSON.stringify(form.materials)
  // // form.processImgUrls = JSON.stringify(form.processImgUrls)
  // // Object.keys(form).forEach(key => {
  // //   formData.append(key, form[key])
  // // })
  // formData.append('goodsSolImg', form.goodsSolImg)
  // console.log('updateScheme: ', form)
  return request({
    url: '/solution/update',
    method: 'post',
    data: formData
  })
}

/**
 * 新增方案配置
 * @param formData
 */
export function addScheme(formData) {
  return request({
    url: '/solution/save',
    method: 'post',
    data: formData
  })
}

/**
 * 方案配置导出
 */
export function exportSchemeToFile() {
  location.href = `${process.env.BASE_API}/solution/down`
  // return request({
  //   url: '/material/down',
  //   method: 'get',
  //   responseType: 'blob'
  // })
}

/* 以下为人分类配置相关 api (classification) */

/**
 * 获取分类配置树状结构
 */
export function getClassificationTree() {
  return request({
    url: '/catalog/selectCatalogs',
    method: 'post'
  })
}

/**
 * 禁用分类
 * @param catId
 * @param catLevel
 */
export function disableClassification(catId, catLevel) {
  return request({
    url: '/catalog/catalogDisable',
    method: 'post',
    data: {
      catId,
      catLevel
    }
  })
}

/**
 * 启用分类
 * @param catId
 * @param catLevel
 */
export function enableClassification(catId, catLevel) {
  return request({
    url: '/catalog/catalogEnable',
    method: 'post',
    data: {
      catId,
      catLevel
    }
  })
}

/**
 * 获取单个分类详情
 * @param catId
 * @param catLevel
 */
export function getClassificationDetail(catId, catLevel) {
  return request({
    url: '/catalog/selectCatalogDetail',
    method: 'post',
    data: {
      catId,
      catLevel
    }
  })
}

/**
 * 更新 1，2 级分类
 * @param formData
 */
export function updateFirstAndSecondClassification(formData) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/catalog/updateCatalog',
    method: 'post',
    data: formData
    // data: {
    //   catalogName: form.catalogName,
    //   catId: form.catId,
    //   parentCatId: form.parentId
    // }
  })
}

/**
 * 新增 1，2 级分类
 * @param formData
 */
export function addFirstAndSecondClassification(formData) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/catalog/saveCatalog',
    method: 'post',
    data: formData
  })
}

/**
 * 更新 3 级分类
 * @param formData
 */
export function updateThirdClassification(formData) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/catalog/updateGoods',
    method: 'post',
    data: formData
  })
}

/**
 * 新增 3 级分类
 * @param formData
 */
export function addThirdClassification(formData) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/catalog/saveGoods',
    method: 'post',
    data: formData
  })
}

/**
 * 获取 3 级分类中的下拉方案列表
 */
export function getSchemeOptions() {
  return request({
    url: '/catalog/selectSolutionList',
    method: 'post'
  })
}

/* 以下为人搜索配置相关 api (search) */

/**
 * 获取搜索列表
 * @param params
 */
export function getSearchList(params) {
  return request({
    url: '/search/selectRecommendSolutions',
    method: 'post',
    data: params
  })
}

/**
 * 获取单个搜索配置详情
 * @param searchId
 */
export function getSearchDetail(searchId) {
  return request({
    url: '/search/selectRecommendSolutionDetail',
    method: 'post',
    data: {
      id: searchId
    }
  })
}

/**
 * 根据搜索词查询方案列表
 * @param searchTxt
 */
export function getSchemeListBySearchTerms(searchTxt) {
  return request({
    url: '/search/selectSolutionsBySearchTxt',
    method: 'post',
    data: {
      searchTxt
    }
  })
}

/**
 * 新增搜索配置
 * @param params
 */
export function saveSearch(params) {
  return request({
    url: '/search/save',
    method: 'post',
    data: {
      searchTxt: params.searchTxt,
      solutionId: params.solutionId
    }
  })
}

/**
 * 更新搜索配置
 * @param params
 */
export function updateSearch(params) {
  return request({
    url: '/search/update',
    method: 'post',
    data: {
      searchTxt: params.searchTxt,
      solutionId: params.solutionId,
      id: params.id
    }
  })
}

/**
 * 删除搜索配置
 * @param searchId
 */
export function deleteSearch(searchId) {
  return request({
    url: '/search/delete',
    method: 'post',
    data: [{
      id: searchId
    }]
  })
}

/* 以下为包装碳排配置表相关 api (packcarbon)) */

/**
 * 获取包装材料列表
 * @param params
 */

export function getPackCarbonList(params) {
  return request({
    url: '/matconfig/selectConfigs',
    method: 'post',
    data: params
  })
}

/**
 * 方案配置导出
 */
export function exportPackCarbonToFile() {
  location.href = `${process.env.BASE_API}/matconfig/down`
  // return request({
  //   url: '/material/down',
  //   method: 'get',
  //   responseType: 'blob'
  // })
}

/**
 * 获取单个包装材料碳排值配置详情
 * @param id
 */
export function getPackCarbonDetail(id) {
  return request({
    url: '/matconfig/selectConfigDetail',
    method: 'post',
    data: {
      id
    }
  })
}

/**
 * 新建包装材料碳排值配
 * @param form
 */
export function savePackCarbon(form) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/matconfig/add',
    method: 'post',
    data: form
  })
}

/**
 * 更新包装材料碳排值配置表
 * @param formData
 */
export function updatePackCarbon(form) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/matconfig/update',
    method: 'post',
    data: form
  })
}