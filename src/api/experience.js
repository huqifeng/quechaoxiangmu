import http from '@/utils/request'
// 获取banner
export function getBanner (data) {
  return http.request({
    url: '/api/banner',
    method: 'get',
    params: {
      ...data
    }
  })
}
// 获取标签
export function getTags (data) {
  return http.request({
    url: '/api/tags/index',
    method: 'get',
    params: {
      ...data
    }
  })
}
// 获取 区域
export function getRegions (data) {
  return http.request({
    url: '/api/regions/index',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 经验分享列表
export function getJyList (data) {
  return http.request({
    url: '/api/jyposts/index',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 经验分享列表搜索
export function searchJyList (data) {
  return http.request({
    url: '/api/jyposts/searchJypost',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 经验分享详情
export function getJyDetail (data) {
  return http.request({
    url: '/api/jyposts/show',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 经验分享帖子评论获取
export function getCmts (data) {
  return http.request({
    url: '/api/jyposts/getCmts',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 经验分享点赞和取消赞
export function setZan (data) {
  return http.request({
    url: '/api/jyposts/zan',
    method: 'post',
    data
  })
}

// 经验分享详情评论帖子
export function commentJy (data) {
  return http.request({
    url: '/api/jyposts/comment',
    method: 'post',
    data
  })
}
