import http from '@/utils/request'

// 获取用户信息
export function getUserInfo (data) {
  return http.request({
    url: '/api/login',
    method: 'post',
    data
  })
}

// 获取我的健康值 个人中心
export function getUserJifens (data) {
  return http.request({
    url: '/api/nhsusers/userJifens',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 获取我的提问和我的视频 个人中心
export function getUserPosts (data) {
  return http.request({
    url: '/api/nhsusers/userPosts',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 收到的赞 个人中心
export function getUserZans (data) {
  return http.request({
    url: '/api/nhsusers/userZans',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 收到的的评论 个人中心
export function getUserCmts (data) {
  return http.request({
    url: '/api/nhsusers/userCmts',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 健康值兑换 个人中心
export function getUserBuy (data) {
  return http.request({
    url: '/api/nhsusers/userBuy',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 礼品列表 个人中心
export function getGiftsList (data) {
  return http.request({
    url: '/api/gifts/index',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 礼品兑换规则列表 个人中心
export function getGiftroles (data) {
  return http.request({
    url: '/api/giftroles/index',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 删除论坛问题
export function delpost (data) {
  return http.request({
    url: '/api/ltposts/delete',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 删除团队展示问题
export function delTmPost (data) {
  return http.request({
    url: '/api/tmposts/delete',
    method: 'get',
    params: {
      ...data
    }
  })
}
