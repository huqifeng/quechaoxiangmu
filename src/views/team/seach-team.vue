<template>
  <div class="team seach">
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
        show-action
        @change="onSearch"
        @search="onSearch"
        @cancel="onCancel">
      </van-search>
      <!-- <div class="tag-box">
        <h2>热门标签</h2>
        <div>
          <span
            v-for="(item, index) in tagList"
            :key="index"
            @click="selectTag(item)"
            class="tag"
            :class="{active:item.checked}">{{item.tag_name}}</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { getTags } from '@/api/team'

export default {
  data () {
    return {
      seachVal: '',
      selectArr: [],
      tagList: []
    }
  },
  mounted () {
    this.getTag()
  },
  methods: {
    getTag () {
      getTags({ tag_type: 2, select_mode: 1 }).then(res => {
        this.tagList = res.data
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
    onSearch () {
      console.log(this.selectArr)
      this.$router.push({
        path: '/seachTeamList',
        query: { seachVal: this.seachVal, selectArr: this.selectArr.join(','), source: 1 }
      })
    },
    onCancel () {
      this.goBack()
    },
    selectTag (item) {
      let that = this
      if (typeof item.checked === 'undefined') {
        this.$set(item, 'checked', true)
      } else {
        item.checked = !item.checked
      }
      if (item.checked) {
        that.selectArr.push(item.id)
      } else {
        for (var i = 0; i < that.selectArr.length; i++) {
          if (that.selectArr[i] === item.id) {
            that.selectArr.splice(i, 1)
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tag-box {
  h2 {
    margin-bottom: 20px;
    font-size: 14px;
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
  .tag.active {
    border: 1px solid #dd2279;
    background: #dd2279;
    color: #fff;
  }
}
</style>
