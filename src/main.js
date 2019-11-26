import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import {
  NavBar,
  Search,
  Row,
  Col,
  Toast,
  DropdownMenu,
  Tag,
  Icon,
  DropdownItem,
  Lazyload,
  Grid,
  GridItem,
  Image,
  Loading,
  List,
  Uploader,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  Button,
  Dialog,
  ImagePreview,
  SwipeCell
} from 'vant'
import 'vant/lib/index.css'
import './styles/vant-ui.less' // vant-ui 覆盖样式
import './styles/index.less' // 自定义全局默认样式
import 'amfe-flexible/index.js'

// window.baseUrl = 'http://211.159.175.37'
window.baseUrl = 'http://quechao.gf.bj.cn'


Vue.config.productionTip = false
Vue.use(NavBar).use(Toast).use(Search).use(Row).use(Col).use(DropdownMenu).use(DropdownItem).use(Tag).use(Icon).use(Lazyload, {
  lazyComponent: true
}).use(Dialog).use(SwipeCell).use(Button).use(Grid).use(GridItem).use(Image).use(Loading).use(List).use(Uploader).use(Swipe).use(SwipeItem).use(Tab).use(Tabs).use(ImagePreview)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
