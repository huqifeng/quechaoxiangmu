// import Cookies from 'js-cookie'

// const TokenKey = 'Authorization'
/*
 * 设置setLocalStorage
 * */
export function setLocalStorage (key, value) {
  window.localStorage.setItem(key, window.JSON.stringify(value))
}
/*
 * 获取getLocalStorage
 * */
export function getLocalStorage (key) {
  return window.JSON.parse(window.localStorage.getItem(key) || '[]')
}
/*
 * 设置setSessionStorage
 * */
export function setSessionStorage (key, value) {
  window.sessionStorage.setItem(key, window.JSON.stringify(value))
}
/*
 * 获取getSessionStorage
 * */
export function getSessionStorage (key) {
  return window.JSON.parse(window.sessionStorage.getItem(key) || '[]')
}
/*
 * 获取getBaseUrl
 * */
export function getBaseUrl () {
  return 'http://211.159.175.37'
}

/*
 * 获取 数组处理
 * */
export function dataDeal (data) {
  var listArr = []
  data.forEach(function (el, index) {
    for (var i = 0; i < listArr.length; i++) {
      // 对比相同的字段key，相同放入对应的数组
      if (listArr[i].tag_type === el.tag_type) {
        listArr[i].listInfo.push(el)
        return
      }
    }
    // 第一次对比没有参照，放入参照
    listArr.push({
      tag_type: el.tag_type,
      listInfo: [el]
    })
  })
  return listArr
}

/*
 * 获取getToken
 * */
// export function getToken () {
//   return Cookies.get(TokenKey)
// }
/*
 * 设置setToken
 * */
// export function setToken (token) {
//   return Cookies.set(TokenKey, token)
// }
/*
 * 移除removeToken
 * */
// export function removeToken () {
//   return Cookies.remove(TokenKey)
// }
