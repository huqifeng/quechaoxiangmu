import http from '@/utils/request'

// 获取标签
export function getTags (data) {
  return http.request({
    url: '/api/api/tags/index',
    method: 'get',
    params: {
      ...data
    }
  })
}
// 获取 区域
export function getRegions (data) {
  return http.request({
    url: '/api/api/regions/index',
    method: 'get',
    params: {
      ...data
    }
  })
}
// 论坛创建
export function addLtposts (data) {
  return http.request({
    url: '/api/api/ltposts/store',
    method: 'post',
    data
  })
}
// 论坛文件上传
export function fileUpload (data) {
  return http.request({
    url: '/api/api/ltposts/fileupload',
    method: 'post',
    data
  })
}

// 论坛列表
export function getLtList (data) {
  return http.request({
    url: '/api/api/ltposts/index',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 论坛列表搜索
export function searchLtList (data) {
  return http.request({
    url: '/api/api/ltposts/searchLtpost',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 论坛详情
export function getLtDetail (data) {
  return http.request({
    url: '/api/api/ltposts/show',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 论坛帖子评论获取
export function getCmts (data) {
  return http.request({
    url: '/api/api/ltposts/getCmts',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 论坛点赞和取消赞
export function setZan (data) {
  return http.request({
    url: '/api/api/ltposts/zan',
    method: 'post',
    data
  })
}

// 论坛详情评论帖子
export function commentLt (data) {
  return http.request({
    url: '/api/api/ltposts/comment',
    method: 'post',
    data
  })
}
