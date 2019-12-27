import request from '../utils/request'

/**
 * 获取方案库分类列表（用作导航菜单栏）
 */
export function getClassificationTree() {
  return request({
    url: '/catalog/buildCataTree',
    method: 'get'
  })
}

/**
 * 获取方案列表
 * @param goodsId
 * @param jumpPage
 * @param pageSize
 */
export function getSchemeList(goodsId, jumpPage, pageSize) {
  return request({
    url: '/solution/solList',
    method: 'post',
    data: {
      goodsId,
      jumpPage,
      pageSize
    }
  })
}

/**
 * 根据方案 id 获取方案详情
 * @param solutionId
 */
export function getSchemeDetail(solutionId) {
  return request({
    url: '/homepage/getSolInfo',
    method: 'post',
    data: {
      solutionId
    }
  })
}

/**
 * 根据方案 id 获取相似方案
 * @param solutionId
 */
export function getSimilarScheme(solutionId) {
  return request({
    url: '/homepage/relatedSol',
    method: 'post',
    data: {
      solutionId
    }
  })
}

/**
 * 方案评论
 * @param solutionId
 * @param content
 */
export function commentScheme(solutionId, content) {
  return request({
    url: '/solution/comment',
    method: 'post',
    data: {
      solutionId,
      content
    }
  })
}

/**
 * 回复评论及回复
 * @param commentId
 * @param replyContent
 * @param replyTo
 * @param repTag int (0: 回复评论, 1: 回复回复)
 */
export function replyComment(commentId, replyContent, replyTo, repTag) {
  return request({
    url: '/solution/reply',
    method: 'post',
    data: {
      commentId: commentId,
      replyContent: replyContent,
      replyTo: replyTo,
      repTag: repTag
    }
  })
}

/**
 * 删除评论或回复
 * @param id
 * @param repTag
 */
export function deleteComment(id, repTag) {
  return request({
    url: '/solution/delRep',
    method: 'post',
    data: {
      id,
      repTag
    }
  })
}

/**
 * 添加到我的收藏列表
 * @param solutionId
 */
export function collectScheme(solutionId) {
  return request({
    url: '/solution/addFav',
    method: 'post',
    data: {
      solutionId
    }
  })
}

/**
 * 取消收藏
 * @param solutionIds
 */
export function unCollectScheme(...solutionIds) {
  //const ids = solutionIds.map(id => Object.assign({}, { solIds: id }))
  const ids = solutionIds;
  return request({
    url: '/solution/delFav',
    method: 'post',
    data: ids
  })
}

/**
 * 获取收藏方案列表
 * @param currentPage
 * @param pageSize
 */
export function getFavoriteSchemeList(currentPage, pageSize) {
  return request({
    url: '/solution/favList',
    method: 'post',
    data: {
      currentPage,
      pageSize
    }
  })
}

export function getSchemeByName(name, currentPage, pageSize) {
  return request({
    url: '/search/searchByGoodsName',
    method: 'post',
    data: {
      searchTxt: name,
      currentPage,
      pageSize
    }
  })
}
