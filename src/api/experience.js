import http from '@/utils/request'
// 获取banner
export function getBanner(data) {
  return http.request({
    url: '/api/banner',
    method: 'get',
    params: {
      ...data
    }
  })
}
// 获取标签
export function getTags(data) {
  return http.request({
    //url: '/api/tags/index',http://qc.gf.bj.cn/api/tag
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
    // url: '/api/regions/index',
    url: 'api/forum_region',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 经验分享列表
export function getJyList(data) {
  return http.request({
    //url: '/api/jyposts/index',
    url: '/api/forum?block_id=2',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 经验分享列表搜索
export function searchJyList(data) {
  return http.request({
    url: '/api/forum?block_id=2',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 经验分享详情
export function getJyDetail(data) {
  return http.request({
    url: `/api/forum/${data.post_id}`,
    method: 'get',
    params: {
      ...data
    }
  })
}

// 经验分享帖子评论获取
export function getCmts(data) {
  return http.request({
    url: '/api/jyposts/getCmts',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 经验分享点赞和取消赞
export function setZan(data) {
  return http.request({
    url: '/api/forumuserlike',
    method: 'post',
    data
  })
}

// 经验分享详情二级回复
export function forumCommentReply(data) {
  return http.request({
    url: '/api/forum_comment_reply ',
    method: 'post',
    data
  })
}
