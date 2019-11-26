<template>
  <div class="forum">
    <van-nav-bar title="论坛" left-arrow @click-left="onClickLeft" />
    <div class="wrap">
      <van-search
        left-icon
        right-icon="search"
        v-model="seachVal"
        placeholder="请输入搜索关键词"
        show-action
        @click="onSearch"
        @search="onSearch"
      >
        <div class="quiz-btn" slot="action" @click="onQuiz">
          <van-icon name="edit" />提问
        </div>
      </van-search>
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
      <div class="tag-select-box" :class="{left: tagList[0] && tagList[0].listInfo.length > 3}">
        <div class="tag-list" v-for="(tagItem,index) in tagList" :key="index">
          <!-- <span>产 品</span> -->
          <div           
            v-for="(tag, itemIndex) in tagItem.listInfo"
            :key="itemIndex"
            class="tag-type"
            @click="goList(tag)"
          >{{tag.name}}</div>
        </div>
      </div>
      <van-row>
        <van-col span="24">
          <van-tag round :color="shortVal==='2'? '#00C1B2': '#969799'" @click="sortClick('2')">
            最热
            <van-icon class="rotate" name="exchange" />
          </van-tag>
          <van-tag round :color="shortVal==='1'? '#00C1B2': '#969799'" @click="sortClick('1')">
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
              v-for="(item, index) in list"
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
                    v-show="tagIndex < 3"
                    round
                    v-for="(itemTag, tagIndex) in item.tagList"
                    :key="tagIndex"
                    v-if="itemTag"
                  >{{itemTag.name}}</van-tag>
                </van-col>
                <van-col span="12" class="item-count-box">
                  <p>赞 {{item.zans_count ? item.zans_count : 0}}</p>
                  <p>评论 {{item.comments_count ? item.comments_count: 0}}</p>
                  <p>想问 {{item.lt_question_count ? item.lt_question_count : 0}}</p>
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
import { dataDeal } from "@/utils/util";
import { getLtList, getTags } from "@/api/forum";
export default {
  name: "forum",
  components: {},
  data() {
    return {
      baseUrl: window.baseUrl,
      curPage: 1,
      pageNum: 10,
      total: 0,
      seachVal: '',
      shortVal: "1",
      questionStatus: 0,
      questionList: [
        {
          text: "全部",
          id: 0,
          iconName: "apps-o"
        },
        {
          text: "未解答",
          id: 1,
          iconName: "question-o"
        },
        {
          text: "已解答",
          id: 2,
          iconName: "certificate"
        }
      ],
      selectVal: 0,
      list: [],
      tagList: {},
      loading: false,
      finished: false,
      finishedText: "暂无数据"
    };
  },
  mounted() {
    this.getTag();
  },
  methods: {
    getTag() {
      getTags().then(res => {
          this.tagList = dataDeal(res.data);
      }).catch(err => {
          console.log(err);
      });
    },
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    onClickLeft() {
      this.goBack();
    },
    onSearch() {
      this.$router.push({
        path: "/seachForum"
      });
    },
    selectTab(val) {
      this.curPage = 1;
      this.loading = true;
      this.finished = false;
      this.list = [];
      this.questionStatus = val;
      this.onLoad();
    },
    goList(tag) {
      this.$router.push({
        path: "/seachForumList",
        query: { tagName: tag.tag_name, selectArr: tag.id, source: 1 }
      });
    },
    // 获取列表
    onLoad() {
      getLtList({
        block_id: 1,
        order_answer: this.questionStatus,
        order_model: this.shortVal
      }).then(res => {
          // debugger
          let ltData = res.data;
                    
          ltData.map(item => {       
            item.tagList = item.tags
            this.list.push(item);
          });

          this.loading = false;
          this.finished = true;
          
          this.finishedText = this.list.length > 0 ? "没有更多了" : "暂无数据";
        })
        // .catch(err => {
        //   this.finished = true;
        //   this.loading = false;
        //   console.log(err);
        // });
    },
    onQuiz() {
      this.$router.push({
        path: "/forumIssue"
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
        query: { id: row.id }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.quiz-btn {
  font-size: 14px;
  line-height: 16px;
  color: #00c1b2;
}
.quiz-btn .van-icon-edit {
  display: block;
  text-align: center;
}
.tab-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 6px 0;
  li {
    align-items: center;
    display: flex;
  }
  .active {
    border-bottom: 1px solid #00c1b2;
    color: #00c1b2;
  }
}
.tag-select-box {
  padding-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  overflow-x: scroll;
  margin-bottom: 10px;
}
.tag-list {
  margin-bottom: 8px;
  // display: flex;
  // align-items: center;
  // white-space: nowrap;
  // overflow: scroll;
  span {
    margin-right: 10px;
    font-size: 14px;
  }
}
.tag-type {
  display: inline-block;
  width: 30%;
  height: 40px;
  margin-right: 16px;
  border: 1px solid #00c1b2;
  color: #333;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
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
  background: #00c1b2;
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
