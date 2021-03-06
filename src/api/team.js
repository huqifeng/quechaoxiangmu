import http from '@/utils/request'

// 获取标签
export function getTags(data) {
  return http.request({
    url: '/api/tag',
    method: 'get',
    params: {
      ...data
    }
  })
}
// 获取 区域
export function getRegions(data) {
  return http.request({
    url: '/api/forum_region',
    method: 'get',
    params: {
      ...data
    }
  })
}
// 团队展示创建
export function addTmposts(data) {
  return http.request({
    url: '/api/forum',
    method: 'post',
    data
  })
}
// 团队展示文件上传
export function fileUpload(data) {
  return http.request({
    url: '/api/upload ',
    method: 'post',
    data
  })
}

// 团队展示列表
export function getTeamList(data) {
  return http.request({
    url: '/api/forum',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 团队展示列表搜索
export function searchTeamList(data) {
  return http.request({
    url: '/api/forum',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 团队展示详情
export function getTeamDetail(data) {
  return http.request({
    url: `/api/forum/${data.id}`,
    method: 'get',
    params: {
      // ...data
    }
  })
}

// 团队展示帖子评论获取
export function getCmts(data) {
  return http.request({
    url: '/api/tmposts/getCmts',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 团队展示点赞和取消赞
export function setZan(data) {
  return http.request({
    url: '/api/forumuserlike',
    method: 'post',
    data
  })
}

// 团队展示详情评论帖子
export function commentTeam(data) {
  return http.request({
    url: '/api/forum_comment',
    method: 'post',
    data
  })
}

// 团队展示详情二级回复
export function forumCommentReply(data) {
  return http.request({
    url: '/api/forum_comment_reply ',
    method: 'post',
    data
  })
}
