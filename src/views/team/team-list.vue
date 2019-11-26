<template>
  <div class="team team-list">
    <van-nav-bar
      title="团队展示"
      left-arrow
      @click-left="onClickLeft" />
    <div class="wrap">
      <van-search
        left-icon=""
        right-icon="search"
        v-model="seachVal"
        placeholder="请输入搜索关键词"
        @change="onSearch"
        @search="onSearch">
      </van-search>
      <van-row>
        <van-col span="8">
          <van-dropdown-menu active-color="#DD2279">
            <van-dropdown-item v-model="selectVal" :options="selectList" @change="sortClick()" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="16">
          <van-tag round :color="shortVal==='1'? '#dd2279': '#969799'" @click="sortClick('1')">最热
            <van-icon class="rotate" name="exchange" />
          </van-tag>
          <van-tag round :color="shortVal==='2'? '#dd2279': '#969799'" @click="sortClick('2')">最新发布
            <van-icon class="rotate" name="exchange" />
          </van-tag>
        </van-col>
      </van-row>
    </div>
    <div class="list-wrap line">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        @load="onLoad">
        <lazy-component>
          <div
            class="line list-item"
            v-for="(item,index) in list"
            :key="index"
            @click="goLink(item)">
            <img v-lazy="item.imageUrl">
            <div class="item-content">
              <h2>{{item.title}}</h2>
              <p>{{item.region_id}} {{item.username}} {{item.updated_at && item.updated_at.split(' ')[0]}}</p>
              <div class="count-box">
                <span>
                  <van-icon name="like" />
                  {{item.zanNum ? item.zanNum : 0}}
                </span>
                <span>
                  <van-icon name="comment" />
                  {{item.cmtNum ? item.cmtNum : 0}}
                </span>
              </div>
            </div>
          </div>
        </lazy-component>
      </van-list>
    </div>
  </div>
</template>

<script>
import { getRegions, searchTeamList } from '@/api/team'

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
      selectArr: '',
      seachVal: '',
      shortVal: '1',
      selectVal: 0,
      selectList: [
        { text: '全部大区', value: 0 }
      ],
      list: [],
      loading: false,
      finished: false,
      finishedText: ''
    }
  },
  mounted () {
    this.getRegLis()
    this.selectArr = this.$route.query.selectArr
    this.seachVal = this.$route.query.seachVal
  },
  methods: {
    // 获取区域
    getRegLis () {
      getRegions().then(res => {
        if (res.data && res.data.length > 0) {
          this.selectList = res.data.map(item => {
            item.text = item.region_name
            item.value = item.id
            return item
          })
          this.selectList.unshift({ text: '全部大区', value: 0 })
          this.selectVal = 0
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取列表
    onLoad () {
      searchTeamList({
        current_page: this.curPage,
        page_num: this.pageNum,
        nhsuser_id: this.userInfo.id,
        region_id: this.selectVal,
        keyword: this.seachVal,
        order_mode: this.shortVal,
        tag_ids: this.selectArr
      }).then(res => {
        let tmData = res.data.tm_posts
        tmData.map(item => {
          if (item.cover) {
            item.imageUrl = this.baseUrl + item.cover
          } else {
            item.imageUrl = 'https://img.yzcdn.cn/vant/apple-1.jpg'
          }
          // if (item.img_dir) {
          //   item.imageUrl = item.img_dir.split(',')[0] ? this.baseUrl + item.img_dir.split(',')[0] : this.baseUrl + item.img_dir
          // }
          console.log(this.list.length)
          this.list.push(item)
        })
        this.curPage = res.data.current_page - 0 + 1
        this.pageNum = res.data.page_num
        this.total = res.data.total

        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= this.total) {
          this.finished = true
        }
        this.finishedText = this.list.length > 0 ? '没有更多了' : '暂无数据'
      }).catch(err => {
        console.log(err)
        this.finished = true
        this.loading = false
      })
    },
    // 返回上一页
    goBack () {
      this.$router.go(-1)
    },
    onClickLeft () {
      this.goBack()
    },
    onSearch () {
      this.curPage = 1
      this.loading = true
      this.finished = false
      this.list = []
      this.onLoad()
    },
    sortClick (val) {
      this.curPage = 1
      this.loading = true
      this.finished = false
      this.list = []
      this.shortVal = val || this.shortVal
      this.onLoad()
    },
    goLink (row) {
      this.$router.push({
        path: '/teamDetail',
        query: { id: row.id, source: 1 }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-dropdown-menu {
  width: 90px;
  height: 32px;
  font-size: 12px;
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
  &::before {
    top: -1px;
  }
}
.list-item {
  display: flex;
  padding: 10px 18px;
  img {
    width: 78px;
    height: 78px;
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
    font-size: 14px;
  }
  p {
    font-size: 12px;
    padding: 6px 0;
  }
}
.count-box {
  font-size: 12px;
  span {
    width: 50%;
    margin-right: 40px;
  }
  .van-icon-like {
    font-size: 14px;
    color: #cc0000;
  }
  .van-icon-comment {
    font-size: 14px;
    color: #cb206f;
  }
}
</style>
