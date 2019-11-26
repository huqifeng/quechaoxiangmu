import Home from '@/views/home'
import Error from '@/views/error-page/error.vue'
import Error401 from '@/views/error-page/401.vue'

/**
 * 路由meta元信息说明
 * meta:{
 *  title:'', // 菜单或面包屑名称
 *  hideInMenu:false // 为true是不显示在菜单内
 * }
 * */

export default [{
  path: '/',
  name: 'home',
  meta: {
    title: '首页',
    hideInMenu: true
  },
  component: Home
}, {
  path: '/team',
  name: 'team',
  meta: {
    title: '团队展示',
    hideInMenu: true
  },
  component: () => import('@/views/team/index.vue')
}, {
  path: '/seachTeam',
  name: 'seachTeam',
  meta: {
    title: '团队展示',
    hideInMenu: true
  },
  component: () => import('@/views/team/seach-team.vue')
}, {
  path: '/seachTeamList',
  name: 'seachTeamList',
  meta: {
    title: '团队展示',
    hideInMenu: true
  },
  component: () => import('@/views/team/team-list.vue')
}, {
  path: '/teamDetail',
  name: 'teamDetail',
  meta: {
    title: '团队展示',
    hideInMenu: true
  },
  component: () => import('@/views/team/team-detail.vue')
}, {
  path: '/teamIssue',
  name: 'teamIssue',
  meta: {
    title: '团队展示',
    hideInMenu: true
  },
  component: () => import('@/views/team/team-issue.vue')
}, {
  path: '/forum',
  name: 'forum',
  meta: {
    title: '论坛',
    hideInMenu: true
  },
  component: () => import('@/views/forum')
}, {
  path: '/seachForum',
  name: 'seachForum',
  meta: {
    title: '论坛',
    hideInMenu: true
  },
  component: () => import('@/views/forum/seach.vue')
}, {
  path: '/seachForumList',
  name: 'seachForumList',
  component: () => import('@/views/forum/list.vue')
}, {
  path: '/forumIssue',
  name: 'forumIssue',
  meta: {
    title: '论坛',
    hideInMenu: true
  },
  component: () => import('@/views/forum/issue.vue')
}, {
  path: '/forumDetail',
  name: 'forumDetail',
  meta: {
    title: '论坛',
    hideInMenu: true
  },
  component: () => import('@/views/forum/detail.vue')
}, {
  path: '/classroom',
  name: 'classroom',
  meta: {
    title: '学术课堂',
    hideInMenu: true
  },
  component: () => import('@/views/classroom/index.vue')
}, {
  path: '/seachClassroom',
  name: 'seachClassroom',
  meta: {
    title: '学术课堂',
    hideInMenu: true
  },
  component: () => import('@/views/classroom/seach.vue')
}, {
  path: '/seachClassroomList',
  name: '学术课堂',
  component: () => import('@/views/classroom/list.vue')
}, {
  path: '/classroomDetail',
  name: 'classroomDetail',
  meta: {
    title: '学术课堂',
    hideInMenu: true
  },
  component: () => import('@/views/classroom/detail.vue')
}, {
  path: '/experience',
  name: 'experience',
  meta: {
    title: '经验分享',
    hideInMenu: true
  },
  component: () => import('@/views/experience/index.vue')
}, {
  path: '/seachExperience',
  name: 'seachExperience',
  meta: {
    title: '经验分享',
    hideInMenu: true
  },
  component: () => import('@/views/experience/seach.vue')
}, {
  path: '/seachExperienceList',
  name: 'seachExperienceList',
  meta: {
    title: '经验分享',
    hideInMenu: true
  },
  component: () => import('@/views/experience/list.vue')
}, {
  path: '/experienceDetail',
  name: 'experienceDetail',
  meta: {
    title: '经验分享',
    hideInMenu: true
  },
  component: () => import('@/views/experience/detail.vue')
}, {
  path: '/personalCenter',
  name: 'personalCenter',
  meta: {
    title: '个人中心',
    hideInMenu: true
  },
  component: () => import('@/views/personal-center')
}, {
  path: '/exchangeList',
  name: 'exchangeList',
  meta: {
    title: '个人中心',
    hideInMenu: true
  },
  component: () => import('@/views/personal-center/exchange-list.vue')
}, {
  path: '/personalInfo',
  name: 'personalInfo',
  meta: {
    title: '个人中心',
    hideInMenu: true
  },
  component: () => import('@/views/personal-center/info.vue')
}, {
  path: '/error',
  name: 'error',
  meta: {
    title: '错误页',
    hideInMenu: true
  },
  component: Error
}, {
  path: '/error401',
  name: 'error401',
  meta: {
    title: '无权限',
    hideInMenu: true
  },
  component: Error401
}]
