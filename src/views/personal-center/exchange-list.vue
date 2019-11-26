<template>
  <div class="personal personal-home">
    <van-nav-bar
      title="个人中心"
      left-arrow
      @click-left="onClickLeft" />
    <div class="list-wrap line">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        @load="onLoad">
        <div class="line list-item">
          <div class="integral-box">
            <div class="integral-total"> 获得的健康值：200</div>
            <div class="exchange-info" @click="exchangeClick()">兑换说明
              <van-icon name="info-o" />
            </div>
          </div>
        </div>
        <lazy-component>
          <div
            class="line list-item"
            v-for="(item,index) in list"
            :key="index">
            <img :src="baseUrl + item.img_dir">
            <div class="item-content">
              <h2>{{item.gift_name}}</h2>
              <p>健康值：{{item.expend_score}}</p>
              <van-button type="primary" size="small" @click="setUserBuy(item)">兑换</van-button>
            </div>
            <div class="count-box">剩余{{item.inventory}}份</div>
          </div>
        </lazy-component>
      </van-list>
    </div>

  </div>
</template>

<script>
import { getUserBuy, getGiftsList, getGiftroles } from '@/api/user'

export default {
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      baseUrl: window.baseUrl,
      activeName: 0,
      list: [],
      rolesList: [],
      curPage: 1,
      pageNum: 10,
      total: 0,
      loading: false,
      finished: false,
      finishedText: ''
    }
  },
  mounted () {
    this.getRoles()
  },
  methods: {
    getRoles () {
      // 兑换规则列表
      getGiftroles({
        id: this.userInfo.id,
        page_num: '',
        current_page: ''
      }).then(res => {
        this.rolesList = res.data.data
        this.msg = '兑换说明'
        //  = this.rolesList.map((item, index) => {
        //   return `<p>兑换成功${item}</p>`
        // })
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 礼品列表
    onLoad () {
      this.loading = true
      this.finished = true
      console.log(this.userInfo.id)
      getGiftsList({
        id: this.userInfo.id,
        current_page: this.curPage,
        page_num: this.pageNum
      }).then(res => {
        this.list = res.data.data
        console.log(this.list)
        this.curPage = res.data.current_page
        this.pageNum = res.data.page_num
        this.total = res.data.total

        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= this.total) {
          this.finished = true
        }
        this.finishedText = '没有更多了'
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    setUserBuy (item) {
      // 健康值兑换
      getUserBuy({
        id: this.userInfo.id,
        gift_id: item.id
      }).then(res => {
        this.$toast.success('兑换成功')
        console.log(res.data)
      }).catch(err => {
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
      this.$dialog.alert({
        message: this.msg
      }).then(() => {
        // on close
      })
    }
  }
}
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background: #fff;
}
.integral-box {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 40px;
  font-size: 15px;
  line-height: 40px;
}
.exchange-info {
  padding: 0 20px;
}
.list-wrap {
  &::before {
    top: -1px;
  }
}
.list-item {
  display: flex;
  align-items: center;
  padding: 10px 18px;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 12px;
    border-radius: 4px;
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
