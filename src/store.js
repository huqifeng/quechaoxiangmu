import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    urlApi: '/api'
    // urlApi: ''

  },
  getters: {

  },
  mutations: {
    // setUserInfo (state, value) {
    //   state.userInfo = value
    //   setLocalStorage('userInfo', value)
    // }
  },
  actions: {
    // 获取用户信息
    // getUserInfo ({
    //   commit
    // }, account) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo(account).then(res => {
    //       const user = res.data
    //       commit('setUserInfo', user)
    //       setSessionStorage('token', res.token)
    //       resolve(user)
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // }
  }
})
