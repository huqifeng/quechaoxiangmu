<template>
  <div class="team seach">
    <van-nav-bar
      title="论坛"
      left-arrow
      @click-left="onClickLeft" />
    <div class="wrap">
      <van-search
        class="search-box"
        left-icon=""
        right-icon="search"
        v-model="seachVal"
        placeholder="请输入搜索关键词"
        show-action
        @change="onSearch"
        @search="onSearch"
        @cancel="onCancel">
      </van-search>
      <div
        v-for="(tagItem,index) in tagList"
        :key="index"
        class="tag-box">
        <h2>
          <img v-if="tagItem.tag_type === '产品'" src="../../assets/icon_tag.png" />
          <img v-if="tagItem.tag_type === '部门'" src="../../assets/icon_tag1.png" />
          {{tagItem.tag_type}}
        </h2>
        <div>
          <span
            v-for="(item, itemIndex) in tagItem.listInfo"
            :key="itemIndex"
            @click="selectTag(item)"
            class="tag"
            :class="{active:item.checked}">{{item.tag_name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dataDeal } from '@/utils/util'
import { getTags } from '@/api/forum'

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
      getTags({
        tag_type: 1,
        select_mode: 1
      }).then(res => {
        this.tagList = dataDeal(res.data)
        console.log(this.tagList)
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
      this.$router.push({
        path: '/seachForumList',
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
.van-search__action {
  color: #00c1b2;
}
.search-box {
  padding-bottom: 22px;
}
.tag-box {
  h2 {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: #00c1b2;
    font-weight: normal;
    font-size: 14px;
  }
  img {
    width: 15px;
    height: 15px;
    margin-right: 5px;
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
    border: 1px solid #00c1b2;
    background: #00c1b2;
    color: #fff;
  }
}
</style>
