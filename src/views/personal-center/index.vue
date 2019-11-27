<template>
  <div class="personal personal-home">
    <van-nav-bar
      title="个人中心"
      left-arrow
      @click-left="onClickLeft" />
    <div class="personal-hd-box">
      <div class="info-box">
        <!-- info="9" -->
        <van-icon name="bell" @click="goInfo()" />
      </div>
      <div class="personal-pic"><img :src="userInfo.avatar"></div>
      <p class="personal-name">{{userInfo.username}} {{userInfo.department}}</p>
      <div class="personal-body-box">
        <van-tabs v-model="activeName" @change="tabChange">
          <van-tab>
            <div slot="title" class="tab-title">
              <van-icon name="smile-o" />
              <p>我的健康值</p>
            </div>
            <div class="line tab-content">
              <div class="line list-item" v-if="false">
                <div class="integral-box">
                  <div class="integral-total"> 获得的健康值：{{alljifen}}</div>
                  <div class="exchange-btn" @click="exchangeClick()">健康值兑换</div>
                </div>
              </div>
              <div style="text-align: center; padding-top: 10px; color: #666; font-size: 16px;">
                敬请期待
              </div>
              <div style="display:none">
                <div class="line list-item">
                  <div class="item-title">
                    <van-icon name="completed" />签到
                  </div>
                  <div class="item-value">+{{jifens.qiandao ? jifens.qiandao : 0}}</div>
                </div>
                <div class="line list-item">
                  <div class="item-title">
                    <van-icon name="upgrade" />上传内容
                  </div>
                  <div class="item-value">+{{jifens.shangchuan ? jifens.shangchuan : 0}}</div>
                </div>
                <div class="line list-item">
                  <div class="item-title">
                    <van-icon name="records" />评论
                  </div>
                  <div class="item-value">+{{jifens.pinglun ? jifens.pinglun : 0}}</div>
                </div>
                <div class="line list-item">
                  <div class="item-title">
                    <van-icon name="good-job-o" />获赞
                  </div>
                  <div class="item-value">+{{jifens.huozan}}</div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab>
            <div slot="title" class="tab-title">
              <van-icon name="question-o" />
              <p>我的提问</p>
            </div>
            <div class="line tab-content">
              <div class="tip_info" v-if="postsList.length === 0">暂无数据</div>
              <van-swipe-cell
                v-for="(postItem,index) in postsList"
                :key="index"
                :name="postItem.id"
                :on-close="onClose">
                <div class="line list-item" @click="goLink(postItem)">
                  <div class="item-title inaline">
                    <p class="inaline">{{postItem.title}}</p>
                    <span>{{postItem.created_at && postItem.created_at.split(' ')[0]}}</span>
                  </div>
                  <van-icon name="arrow" />
                </div>
                <template slot="right">
                  <van-button square type="danger" text="删除" />
                </template>
              </van-swipe-cell>
            </div>
          </van-tab>
          <van-tab>
            <div slot="title" class="tab-title">
              <van-icon name="video-o" />
              <p>我的发布</p>
            </div>
            <div class="line tab-content">
              <div class="tip_info" v-if="videoList.length === 0">暂无数据</div>
              <van-swipe-cell
                v-for="(videoItem,index) in videoList"
                :key="index"
                :on-close="onClose">
                <div class="line list-item" @click="goLink(videoItem)">
                  <div class="item-title inaline">
                    <p class="inaline">{{videoItem.title}}</p>
                    <span>{{videoItem.created_at && videoItem.created_at.split(' ')[0]}}</span>
                  </div>
                  <van-icon name="arrow" />
                </div>
                <template slot="right">
                  <van-button square type="danger" text="删除" />
                </template>
              </van-swipe-cell>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserJifens, getUserPosts, delpost, delTmPost, getUser } from '@/api/user'

export default {
  data () {
    return {
      alljifen: 0,
      activeName: 0,
      userInfo: {},
      nhsuser: {},
      jifens: {},
      postsList: [],
      videoList: [],
      curPage: 1,
      pageNum: 100,
      total: 0
    }
  },
  mounted () {
    this.getUserInfo()
    // this.getJifens()
  },
  methods: {
    getUserInfo () {
      // 获取健康值
      getUser().then(res => {
        this.userInfo = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    tabChange (name, title) {
      if (name === 0) {
        // this.getJifens()
      } else {
        this.getPosts(name)
      }
    },
    // clickPosition 表示关闭时点击的位置
    onClose (clickPosition, instance, detail) {
      console.log(detail)
      switch (clickPosition) {
        case 'outside':
          instance.close()
          break
        case 'right':
          this.$dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            this.delPost(detail.id)
            instance.close()
          }).catch(() => {
            instance.close()
          })
          break
      }
    },
    getJifens () {
      // 获取健康值
      getUserJifens({
        id: this.userInfo.id
      }).then(res => {
        console.log(res.data)
        let data = res.data
        this.alljifen = data.alljifen ? data.alljifen : 0
        this.nhsuser = data.nhsuser
        this.jifens = data.jifens[0] ? data.jifens[0] : {}
      }).catch(err => {
        console.log(err)
      })
    },
    delPost (id) {
      // 删除提问或视频
      if (this.activeName === 1) {
        delpost({
          id: id
        }).then(res => {
          this.$toast.success('删除成功')
          this.getPosts(this.activeName)
        }).catch(err => {
          console.log(err)
        })
      }
      if (this.activeName === 2) {
        delTmPost({
          id: id
        }).then(res => {
          this.$toast.success('删除成功')
          this.getPosts(this.activeName)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    getPosts (name) {
      // 获取提问
      console.log(this.userInfo)
      let postType = ''
      if (name === 1) {
        postType = 1
      }
      if (name === 2) {
        postType = 3
      }
      getUserPosts({
        block_id: postType
      }).then(res => {
        // let list = [{
        //   id: '1',
        //   title: '一个人开始高度自律',
        //   updated_at: '2019-11-08 12:00:00'
        // }]
        if (name === 1) {
          this.postsList = res.data
        }
        if (name === 2) {
          this.videoList = res.data
        }
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
      console.log(1)
      // this.$router.push({
      //   path: '/exchangeList'
      // })
      this.$toast('敬请期待')
    },
    goLink (row) {
      if (this.activeName === 1) {
        this.$router.push({
          path: '/forumDetail',
          query: { id: row.id, source: 1 }
        })
      }
      if (this.activeName === 2) {
        this.$router.push({
          path: '/teamDetail',
          query: { id: row.id, source: 1 }
        })
      }
    },
    goInfo () {
      this.$router.push({
        path: '/personalInfo'
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
.personal-hd-box {
  width: 100%;
  height: 250px;
  background: #caf6c7;
  padding-top: 10px;
}
.info-box {
  padding-right: 18px;
  padding-bottom: 20px;
  text-align: right;
}
.personal-pic {
  width: 75px;
  height: 75px;
  padding: 2px;
  border-radius: 50%;
  margin: 0 auto;
  background: #fff;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
}
.personal-name {
  margin-top: 12px;
  margin-bottom: 40px;
  text-align: center;
  font-size: 18px;
  color: #666;
}

.tab-title {
  margin-top: 15px;
  .van-icon,
  .van-icon::before {
    display: block;
    font-size: 22px;
  }
}
.integral-box {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 40px;
  font-size: 15px;
  line-height: 40px;
}
.exchange-btn {
  padding: 0 20px;
  border-radius: 4px;
  background: #55b33d;
  color: #fff;
}
.tab-content {
  margin-top: 10px;
  &::before {
    top: -1px;
  }
}
.tip_info {
  font-size: 16px;
  padding-top: 20px;
  text-align: center;
  color: #999;
}
.list-item {
  display: flex;
  align-items: center;
  padding: 15px 16px;
  font-size: 14px;
  color: #333;
  &::before {
    bottom: -1px;
  }
  .van-icon {
    margin-right: 8px;
  }
  .van-icon,
  .van-icon::before {
    line-height: 20px;
    font-size: 22px;
  }
}
.item-title,
.item-value {
  flex: 1;
  p {
    margin-bottom: 5px;
  }
  span {
    font-size: 12px;
    color: #999;
  }
}
.item-value {
  text-align: right;
}
</style>
