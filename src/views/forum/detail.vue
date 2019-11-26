<template>
  <div class="team team-detail">
    <van-nav-bar
      title="论坛"
      left-arrow
      @click-left="onClickLeft" />
    <!-- 头部 -->
    <div class="wrap detail-hd">
      <dl>
        <dt><img :src="detailData.users && detailData.users.avatar"></dt>
        <dd>
          <h4>{{detailData.users && detailData.users.username}}</h4>
          <time>{{detailData.created_at && detailData.created_at.split(' ')[0]}}</time>
        </dd>
      </dl>
      <div class="detail-title-box">
        <h2 class="detail-title">问题:{{detailData.title}}</h2>
        <div class="inquisitive-box" :class="{active: detailData.ask === 1}" @click="addInquisitive(detailData.ask, 1, '')">
          <a href="javascript:;">
            <van-icon name="question-o" />我也想问</a>
          <p>{{detailData.asks_count}}人</p>
        </div>
      </div>
      <div class="tag-box">
        <span
          v-for="(item, index) in tagList"
          v-show="item.tag_name"
          :key="index"
          class="tag"
          :class="{active:item.checked}">{{item.tag_name}}</span>
      </div>
    </div>
    <!-- 头部 -->
    <div class="detail-info-box">
      <h5>详情描述:</h5>
      <div class="detail-info intwoline">
        {{ detailData.content}}
      </div>
      <div class="detail-img">
        <img v-show="index < 3" v-for="(item, index) in imageList" :key="index" @click="getImg(imageList,index)" :src="item" alt="">
      </div>
    </div>
    <!-- 评论 -->
    <div class="detail-comment">
      <div class="comment-hd">
        <van-row type="flex" justify="space-between">
          <van-col span="12">
            评论
          </van-col>
          <van-col span="6" class="select-box">
            <van-icon class="rotate" name="exchange" />
            <van-dropdown-menu active-color="#00c1b2">
              <van-dropdown-item v-model="selectVal" :options="selectList" @change="sortClick()" />
            </van-dropdown-menu>
          </van-col>
        </van-row>
      </div>
      <div class="comment-list">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          :finished-text="finishedText"
          @load="onLoad">
          <!-- 评论列表回复 -->
          <div
            v-for="(item, index) in officialLsit"
            :key="index"
            class="comment-item-box line ssss">
            <img :src="item.users.avatar && item.users.avatar">
            <div class="comment-item-content">
              <div class="comment-item-hd">
                <div class="comment-item-hd-name">
                  <h4><span v-if="item.is_office" class="official">官方回复</span>{{item.users.username}} {{item.users.department}}</h4>
                  <time>{{item.updated_at}}</time>
                </div>
                <div v-if="userInfo.id+'' === detailData.nhsuser_id" class="accept-btn" :class="{disabled: item.caina === 1}" @click="addInquisitive(item, 2,item.id)">采纳</div>
              </div>
              <p>{{item.content}} <span class="reply-btn" @click="commentClick(item.id)">回复</span></p>
              <div class="reply-box" v-if="item.reply&&item.reply.length > 0">
                <div class="reply-list" :class="{show:item.show}">
                  <p v-for="(replayItem, replayIndex) in item.reply" :key="replayIndex">{{replayItem.users.username}}：{{replayItem.content}}</p>
                </div>
                <span v-if="item.reply && item.reply.length >= 3" @click="moreReplyClick(item)">更多回复</span>
              </div>
            </div>
          </div>
          <!-- <div
            v-for="(item, index) in comments"
            :key="index"
            class="comment-item-box line ssss">
            333
          </div> -->
          <!-- 评论列表回复 -->
        </van-list>
      </div>
    </div>
    <!-- 评论 -->
    <!-- 底部 -->
    <div class="ft">
      <div class="input-box" v-show="isDiscuss">
        <van-search
          left-icon=""
          v-model="discussVal"
          placeholder="请输入"
          show-action>
          <div slot="action" @click="onDiscuss()">评论</div>
        </van-search>
      </div>
      <div class="btn-box" v-show="!isDiscuss">
        <span :class="{active: detailData.zan_status === '1'}" @click="praiseClick()">
          <van-icon name="like" />
          赞 {{detailData.likes_count}}
        </span>
        <i class="line">|</i>
        <span @click="commentClick()">
          <van-icon name="comment" />
          评论 {{detailData.comments_count}}
        </span>
      </div>
    </div>
    <!-- 底部 -->
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { getLtDetail, setZan, commentLt, addOpera } from '@/api/forum'
export default {
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      baseUrl: window.baseUrl,
      curPage: 1,
      pageNum: 10,
      total: 0,
      selectVal: 1,
      detailData: {},
      officialLsit: [],
      comments: [],
      isDiscuss: false,
      discussVal: '',
      fromCmtid: '',
      cmtType: '',
      selectList: [
        { text: '按热度', value: 1 },
        { text: '按时间', value: 2 }
      ],
      imageList: [],
      tagList: [],
      list: [],
      loading: false,
      finished: false,
      finishedText: '暂无数据'
    }
  },
  mounted () {
    this.postId = this.$route.query.id
    this.getData()
  },
  methods: {
    // 返回上一页
    goBack () {
      this.$router.go(-1)
    },
    onClickLeft () {
      this.goBack()
    },
    getImg (images, index) {
      let _this = this
      let imagesList = []
      images.map(function (item) {
        imagesList.push(item)
      })
      ImagePreview({
        images: imagesList,
        showIndex: true,
        loop: false,
        startPosition: index
      })
    },
    imgClick (item) {
      // window.location.href = item
    },
    getData () {
      let that = this
      that.finished = true
      that.loading = false
      getLtDetail({
        id: that.postId
      }).then(res => {
        that.detailData = res.data
        that.officialLsit = that.detailData.comments
        that.tagList = that.detailData.tags
        that.loading = false
        that.finished = true

        if (that.detailData.img_url) {
          that.imageList = that.detailData.img_url.split(',')[0] ? that.detailData.img_url.split(',') : [that.detailData.img_url]
        }
        this.finishedText = this.officialLsit.length > 0 ? "没有更多了" : "暂无数据";
      }).catch(err => {
        // 加载状态结束
        this.loading = false
        this.finished = true
        console.log(err)
      })
    },
    moreReplyClick (item) {
      let that = this
      if (typeof item.show === 'undefined') {
        that.$set(item, 'show', true)
      } else {
        item.show = !item.show
      }
    },
    addInquisitive (item, flag, id) {
      let that = this
      if (flag === 1) {
        if (that.detailData.ask === 1) {
          return false
        }
      } else {
        if (item.caina === 1) {
          return false
        }
      }

      // 点击想问
      addOpera({
        nhsuser_id: this.userInfo.id,
        post_type: 1,
        post_id: this.detailData.id,
        comment_id: id,
        question_opera: flag
      }).then(res => {
        if (flag === 1) {
          // 想问
        }
        if (flag === 2) {
          // 采纳
        }
        this.getData()
      }).catch(err => {
        console.log(err)
      })
    },
    onDiscuss () {
      if (this.discussVal.trim() === '') {
        this.$toast('请输入评论内容')
        return false
      }
      commentLt({
        post_id: this.detailData.id,
        nhsuser_id: this.detailData.nhsuser_id,
        reply_nhsuser_id: this.userInfo.id,
        cmt_type: this.cmtType,
        post_type: 1,
        from_cmtid: this.fromCmtid,
        office_status: 0,
        content: this.discussVal.trim()
      }).then(res => {
        console.log(res)
        this.discussVal = ''
        this.curPage = 1
        this.loading = true
        this.finished = false
        this.comments = []
        this.getData()
        this.$toast('评论成功，恭喜您获得1积分')
      }).catch(err => {
        console.log(err)
      })
      this.isDiscuss = false
    },
    praiseClick () {
      setZan({
        post_id: this.detailData.id,
        nhsuser_id: this.userInfo.id,
        zan_nhsuser_id: this.detailData.nhsuser_id
      }).then(res => {
        if (this.detailData.zanNum > res.data.zanNum) {
          this.detailData.zan_status = '0'
          this.$toast('取消点赞')
          this.detailData.zanNum = res.data.zanNum
        } else {
          this.detailData.zan_status = '1'
          this.$toast('点赞成功')
          this.detailData.zanNum = res.data.zanNum
        }
      }).catch(err => {
        console.log(err)
      })
    },
    commentClick (id) {
      if (id) {
        this.fromCmtid = id
        this.cmtType = 2
      } else {
        this.fromCmtid = 0
        this.cmtType = 1
      }
      this.isDiscuss = true
    },
    onLoad () {
      let that = this
      // that.comments = []
      getCmts({
        current_page: that.curPage,
        page_num: that.pageNum,
        post_id: that.detailData.id,
        order_mode: that.selectVal
      }).then(res => {
        let commentsData = res.data.comments
        if (commentsData) {
          commentsData.forEach(item => {
            that.comments.push(item)
          })
          that.curPage = res.data.current_page ? res.data.current_page - 0 + 1 : 1 + 1
          that.pageNum = res.data.page_num ? res.data.page_num : 10
          that.total = res.data.total ? res.data.total : res.data.commentsCount
        }
        // 加载状态结束
        that.loading = false
        that.finished = true
        // 数据全部加载完成
        // if (that.comments.length >= that.total) {
        //   that.finished = true
        // }
        // that.finishedText = that.comments.length > 0 ? '没有更多了' : '暂无数据'
        that.finishedText = '没有更多了'
      }).catch(err => {
        console.log(err)
        that.finished = true
        that.loading = false
      })
    },
    sortClick () {
      this.curPage = 1
      this.loading = true
      this.finished = false
      this.comments = []
      this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
.detail-hd {
  dl {
    display: flex;
    height: 42px;
    margin-top: 10px;
    dt {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 6px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    dd {
      flex: 1;
    }
    h4 {
      padding: 2px 0;
      font-size: 16px;
      color: #333;
    }
    time {
      font-size: 12px;
      color: #999;
    }
  }
  .detail-title-box {
    display: flex;
  }
  .detail-title {
    width: 80%;
    padding: 10px 0;
    font-size: 15px;
    color: #333;
  }
  .inquisitive-box {
    flex-direction: column;
    flex: 1;
    font-size: 12px;
  }
}

.inquisitive-box {
  a {
    color: #00c1b2;
    font-size: 0.32rem;
    text-align: center;
    display: flex;
    align-items: center;
  }
  p {
    font-size: 12px;
    text-align: center;
  }
}
.inquisitive-box.active {
  a,
  p {
    color: #999;
  }
}
.tag {
  display: inline-block;
  padding: 0 10px;
  margin: 0 5px 10px 5px;
  color: #666;
  border: 1px solid #666;
  border-radius: 20px;
  line-height: 20px;
  font-size: 12px;
}
.detail-info-box {
  background: #e3f9f7;
  padding: 10px 18px 0;
  h5 {
    color: 14px;
    color: #333;
    font-weight: normal;
  }
}
.detail-info {
  font-size: 12px;
  color: #333;
}
.detail-img {
  display: flex;
  // justify-content: space-between;
  padding: 10px 0;
  margin-bottom: 5px;
}
.detail-img img {
  width: 94px;
  height: 80px;
  object-fit: cover;
  border-radius: 15px;
  margin-right: 15px;
}
.video {
  width: 100%;
  height: 200px;
}
.comment-hd {
  padding: 0 18px;
  line-height: 36px;
  font-size: 14px;
  color: #333;
}
.official {
  color: #00c1b2;
}
.select-box {
  display: flex;
}
.rotate {
  transform: rotate(90deg);
  line-height: 36px;
}
.comment-list {
  margin-bottom: 38px;
}
.comment-item-box {
  display: flex;
  padding: 16px 18px 5px;
  &::before {
    top: 0;
  }
  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    margin-right: 12px;
  }
}
.comment-item-content {
  flex: 1;
  h4 {
    font-size: 14px;
    color: #333;
    font-weight: 500;
    padding-bottom: 6px;
  }
  p {
    font-size: 13px;
    color: #333;
  }
  time {
    display: block;
    font-size: 12px;
    color: #999;
    padding-bottom: 4px;
  }
}
.comment-item-hd {
  display: flex;
  justify-content: space-between;
}
.accept-btn {
  background: #00c1b2;
  min-width: 1.6rem;
  height: 0.8rem;
  padding: 0 0.21333rem;
  font-size: 0.32rem;
  line-height: 0.74667rem;
  color: #fff;
  text-align: center;
  border-radius: 5px;
}
.disabled {
  background: #999;
}
.reply-box {
  padding: 8px 5px;
  background: #e5e1e1;
  p {
    font-size: 12px;
    color: #333;
  }
  span {
    display: block;
    text-decoration: underline;
    font-size: 12px;
  }
}
.reply-list {
  height: 32px;
  overflow: hidden;
  transition: height 0.3s linear;
  &.show {
    height: auto;
  }
}
.reply-btn {
  font-size: 12px;
  color: #00c1b2;
}
.ft {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.input-box {
  padding-left: 18px;
}
.btn-box {
  display: flex;
  height: 38px;
  background: #00c1b2;
  color: #fff;
  line-height: 38px;
  text-align: center;
  span {
    flex: 1;
    font-size: 15px;
  }
  .line {
    font-size: 12px;
    color: #d4d4d4;
  }
  .van-icon {
    margin-right: 6px;
    line-height: inherit;
  }
  .van-icon-like {
    color: #fff;
  }
  .active .van-icon-like {
    color: #ff0000;
  }
}
</style>
