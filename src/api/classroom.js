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

// 学术课堂列表
export function getXsList (data) {
  return http.request({
    url: '/api/xsposts/index',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 学术课堂列表搜索
export function searchXsList (data) {
  return http.request({
    url: '/api/xsposts/searchXspost',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 学术课堂详情
export function getXsDetail (data) {
  return http.request({
    url: '/api/xsposts/show',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 学术课堂帖子评论获取
export function getCmts (data) {
  return http.request({
    url: '/api/xsposts/getCmts',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 学术课堂点赞和取消赞
export function setZan (data) {
  return http.request({
    url: '/api/xsposts/zan',
    method: 'post',
    data
  })
}

// 学术课堂详情评论帖子
export function commentXs (data) {
  return http.request({
    url: '/api/xsposts/comment',
    method: 'post',
    data
  })
}
