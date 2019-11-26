<template>
  <div class="personal personal-home">
    <van-nav-bar
      title="个人中心"
      left-arrow
      @click-left="onClickLeft" />
    <van-tabs v-model="activeName" @change="tabChange">
      <van-tab>
        <div slot="title" class="info-title">
          <van-icon name="thumb-circle-o" />收到的赞
        </div>
        <div class="info-content">
          <van-list
            v-model="loadingZan"
            :finished="finishedZan"
            :finished-text="finishedTextZan"
            @load="getZansList">
            <lazy-component>
              <div
                class="line list-item"
                v-for="item in zanlist"
                :key="item.id"
                @click="goDetail(item)">
                <img :src="item.avatarUrl">
                <p class="inaline">{{item.region_manager}} {{item.username}} {{item.updated_at}} 赞了这条内容</p>
                <van-icon name="arrow" />
              </div>
            </lazy-component>
          </van-list>
        </div>
      </van-tab>
      <van-tab>
        <div slot="title" class="info-title">
          <van-icon name="comment-o" />收到的评论
        </div>
        <div class="info-content">
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="finishedTextCmts"
            @load="getCmtsList">
            <lazy-component>
              <div
                class="line list-item"
                v-for="item in cmtslist"
                :key="item.id"
                @click="goDetail(item)">
                <p class="inaline">{{item.region_id}} {{item.username}} {{item.updated_at}} 评论了这条内容</p>
                <van-icon name="arrow" />
              </div>
            </lazy-component>
          </van-list>
        </div>
      </van-tab>
      <van-tab>
        <div slot="title" class="info-title">
          <van-icon name="bulb-o" />系统消息
        </div>
        <div class="info-content">
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="finishedTextCmts"
            @load="getCmtsList">
            <lazy-component>
              <div
                class="line list-item"
                v-for="item in cmtslist"
                :key="item.id"
                @click="goDetail(item)">
                <p class="inaline">{{item.region_id}} {{item.username}} {{item.updated_at}} 赞了这条内容</p>
                <van-icon name="arrow" />
              </div>
            </lazy-component>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserZans, getUserCmts } from '@/api/user'
export default {
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      activeName: 0,
      zanlist: [],
      curPageZan: 1,
      pageNumZan: 10,
      totalZan: 0,
      loadingZan: false,
      finishedZan: false,

      cmtslist: [],
      curPageCmts: 1,
      pageNumCmts: 10,
      totalCmts: 0,
      loading: false,
      finished: false,
      finishedTextZan: '暂无数据',
      finishedTextCmts: '暂无数据',
      list: [{
        avatarUrl: null,
        balance: null,
        city: null,
        content: null,
        created_at: '2019-11-22 06:26:43',
        department: null,
        email: null,
        employee_id: null,
        huahua: null,
        id: '7',
        img_dir: '/storage/20191122/7336cadc3707c38608f7461dc9a54330.jpg',
        is_admin: null,
        job: null,
        leader: null,
        nhsuser_id: '1',
        nickName: null,
        office_date: null,
        office_leave_date: null,
        office_type: null,
        openid: null,
        password: null,
        phone: null,
        post_id: '7',
        post_type: '2',
        region_id: '2',
        region_manager: null,
        session3rd: null,
        status: '1',
        tags: '5,产品,蔼儿舒::9,产品,佳膳优选::5,产品,蔼儿舒::9,产品,佳膳优选',
        title: null,
        tm_post_type: '2',
        u_region_id: null,
        updated_at: '2019-11-22 06:26:43',
        username: '李浩',
        zanNum: '4'
      }]
    }
  },
  mounted () {
    this.getZansList()
    this.getCmtsList()
  },
  methods: {
    tabChange (name, title) {
      if (name === 0) {
        this.getZansList()
      } else {
        this.getCmtsList()
      }
    },
    goDetail (item) {
      switch (item.post_type) {
        case '1':
          // 论坛
          this.$router.push({
            path: '/forumDetail',
            query: { id: item.id, source: 1 }
          })
          break
        case '2':
          // 团队展示
          this.$router.push({
            path: '/teamDetail',
            query: { id: item.id, source: 1 }
          })
          break
        case '3':
          // 经验分享
          this.$router.push({
            path: '/experienceDetail',
            query: { id: item.id, source: 1 }
          })
          break
        case '4':
          // 学术课堂
          this.$router.push({
            path: '/classroomDetail',
            query: { id: item.id, source: 1 }
          })
          break
        default:
          break
      }
    },
    getZansList () {
      // 收到的赞
      this.loadingZan = true
      this.finishedZan = true
      console.log(this.userInfo.id)
      getUserZans({
        id: this.userInfo.id,
        page_num: this.pageNumZan,
        current_page: this.curPageZan
      }).then(res => {
        if (res.data.length > 0) {
          this.zanlist = res.data
          this.curPageZan = res.data.current_page
          this.pageNumZan = res.data.page_num
          this.totalZan = res.data.total
        }
        // 加载状态结束
        this.loadingZan = false
        // 数据全部加载完成
        if (this.zanlist.length >= this.totalZan) {
          this.finishedZan = true
        }
        this.finishedTextZan = this.zanlist.length > 0 ? '没有更多了' : '暂无数据'
      }).catch(err => {
        this.loadingZan = false
        this.finishedZan = true
        console.log(err)
      })
    },
    getCmtsList () {
      // 收到的评论
      getUserCmts({
        id: this.userInfo.id,
        page_num: this.pageNumCmts,
        current_page: this.curPageCmts
      }).then(res => {
        if (res.data.length > 0) {
          this.cmtslist = res.data
          // this.curPageCmts = res.current_page
          // this.pageNumCmts = res.page_num
          // this.totalCmts = res.total
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.cmtslist.length >= res.data.length) {
          this.finished = true
        }
        this.finishedTextCmts = this.cmtslist.length > 0 ? '没有更多了' : '暂无数据'
      }).catch(err => {
        this.finished = true
        this.loading = false
        console.log(err)
      })
    },
    // 返回上一页
    goBack () {
      this.$router.go(-1)
    },
    onClickLeft () {
      this.goBack()
    },
    exchangeClick () {
      console.log(1)
      this.$router.push({
        path: '/exchangeList'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.info-title {
  display: flex;
  align-items: center;
  justify-content: center;
  .van-icon,
  .van-icon::before {
    font-size: 22px;
  }
  .van-icon {
    margin-right: 5px;
  }
}
.list-wrap {
  &::before {
    top: -1px;
  }
}
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    object-fit: cover;
    margin-right: 12px;
  }
  &::before {
    bottom: 0;
  }
}
.item-content {
  flex: 1;
  color: #333;
  h2 {
    min-height: 28px;
    display: -webkit-box !important;
    overflow: hidden;

    text-overflow: ellipsis;
    word-break: break-all;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 13px;
  }
  p {
    font-size: 12px;
    padding: 6px 0;
  }
}
.count-box {
  font-size: 13px;
  color: #999;
}
</style>
