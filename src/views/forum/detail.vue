<template>
  <div class="team team-detail">
    <van-nav-bar
      title="论坛"
      left-arrow
      @click-left="onClickLeft" />
    <!-- 头部 -->
    <div class="wrap detail-hd">
      <dl>
        <dt><img src="https://img.yzcdn.cn/vant/cat.jpeg"></dt>
        <dd>
          <h4>张XX</h4>
          <time>2019-10-29</time>
        </dd>
      </dl>
      <div class="detail-title-box">
        <h2 class="detail-title">问题:xxxxxxxxxxxxxxxxxxxxxxx...</h2>
        <div class="inquisitive-box" :class="{active: 0}" @click="addInquisitive()">
          <a href="javascript:;">
            <van-icon name="question-o" />我也想问</a>
          <p>10人</p>
        </div>
      </div>
      <div class="tag-box">
        <span
          v-for="(item, index) in tagList"
          :key="index"
          class="tag"
          :class="{active:item.checked}">{{item.text}}</span>
      </div>
    </div>
    <!-- 头部 -->
    <div class="detail-info-box">
      <h5>详情描述:</h5>
      <div class="detail-info intwoline">
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
            <van-dropdown-menu active-color="#DD2279">
              <van-dropdown-item v-model="selectVal" :options="selectList" @change="sortClick()" />
            </van-dropdown-menu>
          </van-col>
        </van-row>
      </div>
      <div class="comment-list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="comment-item-box line">
            <img src="https://img.yzcdn.cn/vant/cat.jpeg">
            <div class="comment-item-content">
              <div class="comment-item-hd">
                <div class="comment-item-hd-name">
                  <h4>张三 销售部</h4>
                  <time>10-29 19:23</time>
                </div>
                <div class="accept-btn" :class="{disabled: 0}">采纳</div>
              </div>
              <p>文字文字文字文字文字文字文字文字文字文字文字文字文字 <span class="reply-btn" @click="commentClick(item.id)">回复</span></p>
              <div class="reply-box">
                <div class="reply-list" :class="{show:item.show}">
                  <p>李四：文字文字文字文字文字文字文字文字文字文</p>
                  <p>李四：文字文字文字文字文字文字文字文字文字文</p>
                  <p>李四：文字文字文字文字文字文字文字文字文字文</p>
                  <p>李四：文字文字文字文字文字文字文字文字文字文</p>
                </div>
                <span @click="moreReplyClick(item)">更多回复</span>
              </div>
            </div>
          </div>
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
        <span @click="praiseClick()">
          <van-icon name="like" />
          赞100
        </span>
        <i class="line">|</i>
        <span @click="commentClick()">
          <van-icon name="comment" />
          评论100
        </span>
      </div>
    </div>
    <!-- 底部 -->
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
export default {
  data () {
    return {
      selectVal: 0,
      isDiscuss: false,
      discussVal: '',
      selectList: [
        { text: '按热度', value: 0 },
        { text: '按时间', value: 1 }
      ],
      imageList: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
        'https://img.yzcdn.cn/vant/apple-3.jpg',
        'https://img.yzcdn.cn/vant/apple-4.jpg',
        'https://img.yzcdn.cn/vant/apple-5.jpg'
      ],
      tagList: [
        { text: '蔼儿舒', value: 0 },
        { text: '蔼儿舒', value: 1 },
        { text: '蔼儿舒', value: 2 }
      ],
      list: [],
      loading: false,
      finished: false
    }
  },
  mounted () {

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
      ImagePreview({
        images: images,
        showIndex: true,
        loop: false,
        startPosition: index
      })
    },
    imgClick (item) {
      window.location.href = item
    },
    moreReplyClick (item) {
      let that = this
      if (typeof item.show === 'undefined') {
        that.$set(item, 'show', true)
      } else {
        item.show = !item.show
      }
    },
    addInquisitive () {
      // 点击想问

    },
    onDiscuss () {
      this.isDiscuss = false
      console.log(this.discussVal)
      this.$toast('评论')
    },
    praiseClick () {
      this.$toast('点赞')
    },
    commentClick (id) {
      if (id) {
        this.$toast('去回复')
      } else {
        this.$toast('去评论')
      }
      this.isDiscuss = true
    },
    onLoad () {
      let _this = this
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < _this.imageList.length; i++) {
          this.list.push({ id: _this.list.length + 1, img: _this.imageList[i], title: _this.list.length + 1 })
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    sortClick () {
      this.$toast('排序')
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
    color: #333333;
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
  justify-content: space-between;
  padding: 10px 0;
  margin-bottom: 5px;
}
.detail-img img {
  width: 94px;
  height: 80px;
  object-fit: cover;
  border-radius: 15px;
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
    color: #ff0000;
  }
}
</style>
