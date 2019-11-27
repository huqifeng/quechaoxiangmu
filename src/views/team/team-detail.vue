<template>
  <div class="team team-detail">
    <van-nav-bar title="团队展示" left-arrow @click-left="onClickLeft" />
    <!-- 头部 -->
    <div class="wrap detail-hd">
      <dl>
        <dt>
          <img :src="detailData.users && detailData.users.avatar" />
        </dt>
        <dd>
          <h4>{{detailData.users && detailData.users.username}}</h4>
          <time>{{detailData.created_at && detailData.created_at}}</time>
        </dd>
      </dl>
      <h2 class="detail-title">{{detailData.title}}</h2>
      <div class="tag-box">
        <span
          v-for="(item, index) in detailData.tags"
          :key="index"
          class="tag"
          :class="{active:item.checked}"
        >{{item.name}}</span>
      </div>
    </div>
    <!-- 头部 -->
    <!-- 图片or视频 -->
    <div class="img-box">
      <video
        class="video"
        v-if="detailData.type_id == '2' && detailData.img_url.length>0"
        :src="detailData.img_url[0]"
        controls="controls"
      >your browser does not support the video tag</video>
      <van-swipe
        v-if="detailData.type_id == '1' && detailData.img_url.length>0"
        :autoplay="3000"
        indicator-color="#dd2279"
        style="height: 200px;"
      >
        <van-swipe-item
          v-for="(image, index) in detailData.img_url"
          :key="index"
          @click="imgClick(image)"
        >
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 图片or视频 -->
    <!-- 评论 -->
    <div class="detail-comment">
      <div class="comment-hd">
        <van-row type="flex" justify="space-between">
          <van-col span="12">评论</van-col>
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
          :immediate-check="false"
          :finished="finished"
          :finished-text="finishedText"
          @load="onLoad"
        >
          <div
            v-for="(item, index) in detailData.comments"
            :key="index"
            class="comment-item-box line"
          >
            <img :src="item.users && item.users.avatar" />
            <div class="comment-item-content">
              <h4>{{item.users && item.users.username}} {{item.users.department}}</h4>
              <time>{{item.updated_at}}</time>
              <p>
                {{item.content}}
                <span class="reply-btn" @click="commentClick(item.id)">回复</span>
              </p>
              <div class="reply-box" v-if="item.reply && item.reply.length > 0">
                <div class="reply-list" :class="{show:item.show}">
                  <p
                    v-for="(replayItem, replayIndex) in item.reply"
                    :key="replayIndex"
                  >{{replayItem.users.username}}：{{replayItem.content}}</p>
                </div>
                <span
                  v-if="item.replay && item.replay.length >= 3"
                  @click="moreReplyClick(item)"
                >更多回复</span>
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
        <van-search left-icon v-model="discussVal" placeholder="请输入" show-action>
          <div slot="action" @click="onDiscuss()">评论</div>
        </van-search>
      </div>
      <div class="btn-box" v-show="!isDiscuss">
        <span :class="{active: detailData.user_likes != null}" @click="praiseClick()">
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
import {
  getTeamDetail,
  getCmts,
  setZan,
  commentTeam,
  forumCommentReply
} from "@/api/team";
export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  data() {
    return {
      baseUrl: window.baseUrl,
      curPage: 1,
      pageNum: 10,
      total: 0,
      selectVal: 1,
      detailData: {},
      comments: [],
      isDiscuss: false,
      discussVal: "",
      fromCmtid: "",
      cmtType: "",
      selectList: [{ text: "按热度", value: 1 }, { text: "按时间", value: 2 }],
      imageList: [],
      tagList: [],
      list: [],
      loading: false,
      finished: false,
      finishedText: "没有更多了"
    };
  },
  mounted() {
    this.postId = this.$route.query.id;
    this.getData();
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    onClickLeft() {
      this.goBack();
    },
    imgClick(item) {
      // window.location.href = item
    },
    getData() {
      this.finished = true;
      this.loading = false;
      getTeamDetail({
        id: this.postId
      })
        .then(res => {
          console.log(res);
          this.detailData = res.data;
          // this.tagList = this.detailData.tags;
          // console.log(this.tagList);
          this.loading = false;
          this.finished = true;
          // this.onLoad();
          if (this.detailData.img_url) {
            this.detailData.img_url = this.detailData.img_url.split(",");
            // ? this.detailData.img_dir.split(",")
            // : this.baseUrl + this.detailData.img_dir;
          } else {
            this.detailData.img_url = [];
          }
        })
        .catch(err => {
          // 加载状态结束
          this.loading = false;
          this.finished = true;
          console.log(err);
        });
    },
    moreReplyClick(item) {
      let that = this;
      if (typeof item.show === "undefined") {
        that.$set(item, "show", true);
      } else {
        item.show = !item.show;
      }
    },
    onDiscuss() {
      if (this.discussVal.trim() === "") {
        this.$toast("请输入评论内容");
        return false;
      }
      // debugger;
      // return;
      if (this.cmtType == 1) {
        commentTeam({
          forum_id: this.detailData.id,
          block_id: "3",
          content: this.discussVal.trim()
        })
          .then(res => {
            console.log(res);
            this.discussVal = "";
            this.curPage = 1;
            this.loading = true;
            this.finished = false;
            this.comments = [];
            this.getData();
            this.$toast("评论成功，恭喜您获得2积分");
          })
          .catch(err => {
            console.log(err);
          });
        this.isDiscuss = false;
      } else if (this.cmtType == 2) {
        forumCommentReply({
          forum_id: this.detailData.id,
          forum_comment_id: this.fromCmtid,
          block_id: "3",
          content: this.discussVal.trim()
        })
          .then(res => {
            console.log(res);
            this.discussVal = "";
            this.curPage = 1;
            this.loading = true;
            this.finished = false;
            this.comments = [];
            this.getData();
            this.$toast("评论成功，恭喜您获得2积分");
          })
          .catch(err => {
            console.log(err);
          });
        this.isDiscuss = false;
      }
      // commentTeam({
      //   forum_id: this.detailData.id,
      //   block_id: "3",
      //   content: this.discussVal.trim()
      // })
      //   .then(res => {
      //     console.log(res);
      //     this.discussVal = "";
      //     this.curPage = 1;
      //     this.loading = true;
      //     this.finished = false;
      //     this.comments = [];
      //     this.getData();
      //     this.$toast("评论成功，恭喜您获得2积分");
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      // this.isDiscuss = false;
    },
    praiseClick() {
      setZan({
        forum_id: this.detailData.id
        // nhsuser_id: this.userInfo.id,
        // zan_nhsuser_id: this.detailData.nhsuser_id
      })
        .then(res => {
          if (res.data.is_like) {
            this.$toast("点赞成功");
            this.detailData.likes_count++;
            this.detailData.user_likes = true;
          } else {
            this.$toast("取消点赞");
            this.detailData.likes_count--;
            this.detailData.user_likes = null;
          }
          // if (this.detailData.zanNum > res.data.zanNum) {
          //   this.detailData.zan_status = "0";
          //   this.$toast("取消点赞");
          //   this.detailData.zanNum = res.data.zanNum;
          // } else {
          //   this.detailData.zan_status = "1";
          //   this.$toast("点赞成功，恭喜您获得1积分");
          //   this.detailData.zanNum = res.data.zanNum;
          // }
        })
        .catch(err => {
          console.log(err);
        });
    },
    commentClick(id) {
      if (id) {
        this.fromCmtid = id;
        this.cmtType = 2;
      } else {
        this.fromCmtid = 0;
        this.cmtType = 1;
      }
      this.isDiscuss = true;
    },
    onLoad() {
      getCmts({
        current_page: this.curPage,
        page_num: this.pageNum,
        post_id: this.detailData.id,
        order_mode: this.selectVal
      })
        .then(res => {
          if (res.data.comments && res.data.comments.length > 0) {
            let commentsData = res.data.comments;
            commentsData.map(item => {
              this.comments.push(item);
            });
            this.curPage = res.data.current_page
              ? res.data.current_page - 0 + 1
              : 1 + 1;
            this.pageNum = res.data.page_num ? res.data.page_num : 10;
            this.total = res.data.total
              ? res.data.total
              : res.data.commentsCount;
          }

          // // 加载状态结束
          // this.loading = false;
          // // 数据全部加载完成
          // if (this.comments.length >= this.total) {
          //   this.finished = true;
          // }
          this.finished = true;
          this.loading = false;

          this.finishedText =
            this.comments.length > 0 ? "没有更多了" : "暂无数据";
        })
        .catch(err => {
          console.log(err);
          this.finished = true;
          this.loading = false;
        });
    },
    sortClick() {
      this.curPage = 1;
      this.loading = true;
      this.finished = false;
      this.comments = [];
      this.onLoad();
    }
  }
};
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
  .detail-title {
    padding: 10px 0;
    font-size: 15px;
    color: #333;
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
  margin-bottom: 58px;
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
  color: #dd2279;
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
  background: #dd2279;
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
