<template>
  <div class="forum">
    <van-nav-bar title="论坛" left-arrow @click-left="onClickLeft" />
    <div class="wrap">
      <van-search
        left-icon
        right-icon="search"
        v-model="seachVal"
        :placeholder="text"
        show-action
        @change="onSearch"
        @search="onSearch"
        @cancel="onCancel"
      ></van-search>
      <ul class="tab-box">
        <li
          v-for="(item,index) in questionList"
          :key="index"
          :class="{active: item.id === questionStatus}"
          @click="selectTab(item.id)"
        >
          <van-icon :name="item.iconName" />
          {{item.text}}
        </li>
      </ul>
      <van-row>
        <van-col span="24">
          <van-tag round :color="shortVal==='1'? '#00C1B2': '#969799'" @click="sortClick('1')">
            最热
            <van-icon class="rotate" name="exchange" />
          </van-tag>
          <van-tag round :color="shortVal==='2'? '#00C1B2': '#969799'" @click="sortClick('2')">
            最新发布
            <van-icon class="rotate" name="exchange" />
          </van-tag>
          <van-tag round :color="shortVal==='3'? '#00C1B2': '#969799'" @click="sortClick('3')">
            关注度
            <van-icon class="rotate" name="exchange" />
          </van-tag>
        </van-col>
      </van-row>
      <div class="line list-wrap">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="finishedText"
          @load="onLoad"
        >
          <lazy-component>
            <div
              v-for="(item,index) in list"
              :key="index"
              class="line list-item"
              @click="goLink(item)"
            >
              <div class="item-title inaline">
                <p class="inaline">{{item.title}}</p>
                <time>{{item.updated_at && item.updated_at.split(' ')[0]}}</time>
              </div>
              <div class="intwoline digest">摘要：{{item.content}}</div>
              <van-row class="item-ft">
                <van-col span="12" class="item-tag-box">
                  <van-tag
                    class="inaline"
                    color="#00C1B2"
                    v-show="tagIndex < 3"
                    round
                    v-for="(itemTag, tagIndex) in item.tagList"
                    :key="tagIndex"
                  >{{itemTag.tag_name}}</van-tag>
                </van-col>
                <van-col span="12" class="item-count-box">
                  <p>赞 {{item.zanNum ? item.zanNum : 0}}</p>
                  <p>评论 {{item.cmtNum ? item.cmtNum : 0}}</p>
                  <p>想问 {{item.askNum ? item.askNum : 0}}</p>
                </van-col>
              </van-row>
            </div>
          </lazy-component>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { searchLtList } from "@/api/forum";
export default {
  name: "forum",
  components: {},
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
      seachVal: "",
      shortVal: "1",
      questionStatus: "",
      questionList: [
        {
          text: "全部",
          id: "",
          iconName: "apps-o"
        },
        {
          text: "未解答",
          id: "0",
          iconName: "question-o"
        },
        {
          text: "已解答",
          id: "1",
          iconName: "certificate"
        }
      ],
      selectVal: 0,
      list: [],
      loading: false,
      finished: false,
      finishedText: "暂无数据",
      text:''
    };
  },
  mounted() {
    this.selectArr = this.$route.query.selectArr;
    this.seachVal = this.$route.query.seachVal;
    this.text = this.$route.query.tagName
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
      this.curPage = 1;
      this.loading = true;
      this.finished = false;
      this.list = [];
      this.onLoad();
    },
    onCancel() {
      this.goBack();
    },
    selectTab(val) {
      this.curPage = 1;
      this.loading = true;
      this.finished = false;
      this.list = [];
      this.questionStatus = val;
      this.onLoad();
    },
    // 获取列表
    onLoad() {
      searchLtList({
        nhsuser_id: this.userInfo.id,
        current_page: this.curPage,
        page_num: this.pageNum,
        question_status: this.questionStatus||'3',
        keyword: this.seachVal,
        order_mode: this.shortVal,
        tag_ids: this.selectArr
      })
        .then(res => {
          if (res.data.lt_posts.length > 0) {
            let ltData = res.data.lt_posts;
            ltData.map(item => {
              // item.tagList = item.tags ? item.tags : [];
              // let arr = item.tags ? item.tags : "";
              // let list = arr.split(":");
              // list.forEach((item2, index2) => {
              //   let arr2 = item2.split(",");
              //   console.log(arr2);
              //   item2 = arr2;
              // });
              // item.tagList = list;
              item.tagList = item.post_tag

              this.list.push(item);
              // console.log(item.tagList);
            });
            this.curPage = res.data.current_page - 0 + 1;
            this.pageNum = res.data.page_num;
            this.total = res.data.total;
          }
          // 加载状态结束
          this.loading = false;
          this.finished = true;
          // this.loading = false;
          // // 数据全部加载完成
          // if (this.list.length >= this.total) {
          //   this.finished = true;
          // }
          this.finishedText = this.list.length > 0 ? "没有更多了" : "暂无数据";
        })
        .catch(err => {
          this.finished = true;
          this.loading = false;
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
        path: "/forumDetail",
        query: { id: row.id, source: 1 }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.van-search__action {
  color: #00c1b2;
}
.quiz-btn {
  font-size: 14px;
  line-height: 16px;
}
.quiz-btn .van-icon-edit {
  display: block;
  text-align: center;
}
.tab-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 6px 0 16px;
  li {
    align-items: center;
    display: flex;
  }
  .active {
    border-bottom: 1px solid #00c1b2;
  }
}
.tag-select-box {
  padding: 10px 0;
}
.tag-list {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  span {
    margin-right: 10px;
    font-size: 14px;
  }
}
.van-tag {
  height: 22px;
  padding: 0 15px;
  margin-right: 20px;
  vertical-align: top;
  font-size: 12px;
  color: #fff;
  text-align: center;
  line-height: 22px;
}
.rotate {
  transform: rotate(90deg);
}
.list-wrap {
}
.list-item {
  padding: 10px 0;
  &::before {
    bottom: -1px;
  }
}
.item-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin-right: 5px;
    font-size: 15px;
  }
  time {
    font-size: 12px;
  }
}
.digest {
  margin: 5px 0 10px;
  font-size: 13px;
  -webkit-line-clamp: 2;
}
.item-tag-box,
.item-count-box {
  .van-tag {
    padding: 0 5px;
    margin-right: 10px;
  }
  display: flex;
}
.item-count-box {
  justify-content: flex-end;
  p {
    font-size: 12px;
    margin-right: 8px;
  }
}
.item-ft {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
