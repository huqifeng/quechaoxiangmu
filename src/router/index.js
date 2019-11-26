import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import {
  setLocalStorage
} from '@/utils/util'

Vue.use(Router)

const createRouter = () => new Router({
  // mode: 'history', // 开发时配置
  mode: 'hash', // 打包时配置
  // base: '/v1.0', // 打包时配置
  scrollBehavior (to, from, savedPosition) {
    // keep-alive 返回缓存页面后记录浏览位置
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition
    }
    // 异步滚动操作
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          x: 0,
          y: 1
        })
      }, 0)
    })
  },
  routes: routes
})

const router = createRouter()

// 重置路由
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/home') {
    let data = to.query
    setLocalStorage('userInfo', data)
  }
  next()

  // let sourceType = to.query.source
  // let token = getSessionStorage('token')
  // if (sourceType === '1' || Object.keys(to.query).length === 0) {
  //   data = getLocalStorage('userInfo')
  // }
  // let arr = Object.keys(store.state.userInfo)
  // if (arr.length === 0) {
  //   if (to.path === '/error' || to.path === '/error401') {
  //     next()
  //   } else {
  //     next()

  //   }
  // } else {
  //   next()
  // }
})

router.afterEach((to, from) => {

})

export default router
