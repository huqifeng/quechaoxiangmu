<template>
  <div class="team team-home experience">
    <van-nav-bar title="经验分享" left-arrow @click-left="onClickLeft" />
    <div class="wrap">
      <van-search
        left-icon
        right-icon="search"
        v-model="seachVal"
        placeholder="请输入搜索关键词"
        @click="onSearch"
        @search="onSearch"
      ></van-search>
      <!-- banner -->
      <div class="img-box" v-show="bannerList && bannerList.length>0">
        <van-swipe :autoplay="3000" indicator-color="#969799" style="height: 158px;">
          <van-swipe-item
            v-for="(item, index) in bannerList"
            :key="index"
            @click="bannerClick(item)"
          >
            <img v-lazy="item.img_url" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- banner -->
      <van-row>
        <van-col span="8">
          <van-dropdown-menu active-color="#F29419">
            <van-dropdown-item v-model="selectVal" :options="selectList" @change="sortClick()" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="16">
          <van-tag round :color="shortVal==='1'? '#F29419': '#969799'" @click="sortClick('1')">
            最热
            <van-icon class="rotate" name="exchange" />
          </van-tag>
          <van-tag round :color="shortVal==='2'? '#F29419': '#969799'" @click="sortClick('2')">
            最新发布
            <van-icon class="rotate" name="exchange" />
          </van-tag>
        </van-col>
      </van-row>
      <div class="list-wrap">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="finishedText"
          @load="onLoad"
        >
          <lazy-component class="lazy-box">
            <div v-for="(item, index) in list" :key="index" class="item-box" @click="goLink(item)">
              <img v-lazy="item.img_url" />
              <div class="item-conten">
                <div class="pic_box">
                  <van-image class="pic" round :src="item.avatarUrl" />
                  <div class="name_box">{{item.users.id}} {{item.users.username}} {{item.users.job}}</div>
                </div>
                <p>{{item.title}}</p>
              </div>
              <div class="item-ft">
                <span :class="{active: item.user_likes != null}" @click.stop="praiseClick(item)">
                  <van-icon name="like" />
                  {{item.likes_count ? item.likes_count : 0}}
                </span>
                <i class="line">|</i>
                <span>
                  <van-icon name="comment" />
                  {{item.asks_count ? item.asks_count : 0}}
                </span>
              </div>
            </div>
          </lazy-component>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { getJyList, getRegions, getBanner, setZan } from "@/api/experience";
export default {
  name: "team",
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  data() {
    return {
      baseUrl: window.baseUrl,
      region_id: "",
      curPage: 1,
      pageNum: 10,
      total: 0,
      seachVal: "",
      shortVal: "1",
      selectVal: 0,
      selectList: [{ text: "全部大区", value: 0 }],
      bannerList: [],
      list: [],
      loading: false,
      finished: false,
      finishedText: "暂无数据"
    };
  },
  mounted() {
    this.getRegLis();
    this.getBannerList();
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    onClickLeft() {
      this.goBack();
    },
    onSearch() {
      this.$router.push({
        path: "/seachExperience"
      });
    },
    bannerClick(item) {
      if (item.link_type + "" === "1") {
        switch (item.cid + "") {
          case "1":
            // 论坛
            this.$router.push({
              path: "/forumDetail",
              query: { id: item.url }
            });
            break;
          case "3":
            // 团队展示
            this.$router.push({
              path: "/teamDetail",
              query: { id: item.url }
            });
            break;
          case "2":
            // 经验分享
            this.$router.push({
              path: "/experienceDetail",
              query: { id: item.url }
            });
            break;
          default:
            // 外部链接
            // window.location.href = item.url
            break;
        }
      } else if (item.link_type + "" === "2") {
        window.location.href = item.url;
      }
    },
    praiseClick(item) {
      setZan({
        forum_id: item.id
        // nhsuser_id: this.userInfo.id,
        // zan_nhsuser_id: item.nhsuser_id
      })
        .then(res => {
          // if (item.zanNum > res.data.zanNum) {
          //   item.zan_status = "0";
          //   this.$toast("取消点赞");
          //   item.zanNum = res.data.zanNum;
          // } else {
          //   item.zan_status = "1";
          //   this.$toast("点赞成功，恭喜您获得2积分");
          //   item.zanNum = res.data.zanNum;
          // }
          if (res.data.is_like) {
            this.$toast("点赞成功");
            item.likes_count++;
            item.user_likes = true;
          } else {
            this.$toast("取消点赞");
            item.likes_count--;
            item.user_likes = null;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBannerList() {
      getBanner({ cid: 2 })
        .then(res => {
          if (res.data && res.data.length > 0) {
            this.bannerList = res.data;
          } else {
            this.bannerList = [];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onLoad() {
      let region_name = "";
      this.selectList.forEach((item, index) => {
        if (this.selectVal == item.value) {
          region_name = item.text;
        }
      });
      if (region_name == "全部大区") {
        region_name = "";
      }
      getJyList({
        current_page: this.curPage,
        page_num: this.pageNum,
        region_id: region_name,
        order_mode: this.shortVal
      })
        .then(res => {
          //console.log(res.data)
          let jyData = res.data;

          jyData.map(item => {
            if (item.cover) {
              item.imageUrl = this.baseUrl + item.cover;
            } else {
              item.imageUrl = "http://quechao.gf.bj.cn/storage/cover.jpg";
            }
            // if (item.img_dir) {
            //   item.imageUrl = item.img_dir.split(',')[0] ? this.baseUrl + item.img_dir.split(',')[0] : this.baseUrl + item.img_dir
            // }
            this.list.push(item);
          });
          this.curPage = res.data.current_page - 0 + 1;
          this.pageNum = res.data.page_num;
          this.total = res.data.total;

          // 加载状态结束
          this.loading = false;
          this.finished = true;
          // 数据全部加载完成
          // if (this.list.length >= this.total) {
          //   this.finished = true
          // }
          this.finishedText = this.list.length > 0 ? "没有更多了" : "暂无数据";
        })
        .catch(err => {
          // 加载状态结束
          // this.finished = true
          // this.loading = false
          console.log(err);
        });
    },
    // 获取区域
    getRegLis() {
      getRegions()
        .then(res => {
          console.log(res);
          if (res.data && res.data.length > 0) {
            this.selectList = res.data.map(item => {
              item.text = item.name;
              item.value = item.id;
              return item;
            });
            this.selectList.unshift({
              text: "全部大区",
              value: 0,
              id: 0
            });
            this.selectVal = this.selectList[0].id;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    sortClick(val) {
      this.curPage = 1;
      this.loading = true;
      this.finished = false;
      this.list = [];
      this.shortVal = val || this.shortVal;
      this.onLoad();
    },
    goLink(row) {
      this.$router.push({
        path: "/experienceDetail",
        query: { id: row.id, source: 1 }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.lazy-box {
  overflow: hidden;
}
.van-dropdown-menu {
  width: 90px;
  height: 32px;
  font-size: 12px;
}
.img-box {
  padding-bottom: 10px;
}
.van-tag {
  height: 22px;
  padding: 0 15px;
  margin-left: 20px;
  vertical-align: top;
  font-size: 12px;
  color: #fff;
  line-height: 22px;
}
.rotate {
  transform: rotate(90deg);
}
.list-wrap {
  margin-top: 10px;
}
.item-box {
  position: relative;
  float: left;
  width: 50%;
  overflow: hidden;
  margin-bottom: 10px;
  img {
    width: 100%;
    height: 254px;
    object-fit: cover;
  }
}
.item-box:nth-child(even) {
  padding-left: 6px;
  .item-conten {
    right: -6px;
    margin-left: 6px;
  }
}
.item-box:nth-child(odd) {
  padding-right: 6px;
  .item-conten {
    left: -6px;
    margin-right: 6px;
  }
}
.pic_box {
  display: flex;
  align-items: center;
}
.item-conten {
  position: absolute;
  bottom: 38px;
  width: 100%;
  height: 115px;
  padding: 0 12px;
  text-align: left;
  background: rgba(0, 0, 0, 0.5);
  .name_box {
    font-size: 14px;
    color: #fff;
    margin-left: 5px;
  }
  .pic {
    width: 30px;
    height: 30px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-top: 18px;
    margin-bottom: 12px;
  }
  p {
    font-size: 12px;
    color: #fff;
    display: -webkit-box !important;
    overflow: hidden;

    text-overflow: ellipsis;
    word-break: break-all;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
}
.item-ft {
  display: flex;
  height: 38px;
  background: #f29419;
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
