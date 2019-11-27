<template>
  <div class="team team-issue forum-issue">
    <van-nav-bar
      title="论坛"
      left-arrow
      @click-left="onClickLeft" />
    <div class="wrap">
      <div class="form-item item-title">
        <span class="form-item-laber">标题</span>
        <van-search left-icon="" placeholder="请输入" v-model="titleVal" />
      </div>
      <div class="form-item tag-box">
        <span class="form-item-laber">产品</span>
        <div>
          <span
            v-for="(item, index) in tagList1"
            :key="index"
            @click="selectTag(item)"
            class="tag"
            :class="{active:item.checked}">{{item.text}}</span>
        </div>
      </div>
      <div class="form-item tag-box">
        <span class="form-item-laber">部门</span>
        <div>
          <span
            v-for="(item, index) in tagList"
            :key="index"
            @click="selectTag(item)"
            class="tag"
            :class="{active:item.checked}">{{item.text}}</span>
        </div>
      </div>
      <div class="form-item tag-box">
        <span class="form-item-laber">分类三</span>
        <div>
          <span
            v-for="(item, index) in tagList"
            :key="index"
            @click="selectTag(item)"
            class="tag"
            :class="{active:item.checked}">{{item.text}}</span>
        </div>
      </div>
      <div class="form-item">
        <span class="form-item-laber">详细描述</span>
        <div class="textarea-box">
          <textarea v-model="textVal" placeholder="请输入......"></textarea>
        </div>
      </div>
      <div class="form-item uploader-box">
        <van-dropdown-menu active-color="#00c1b2">
          <van-dropdown-item v-model="selectVal" :disabled="fileList.length>0" :options="selectList" @click="selectClick()" />
        </van-dropdown-menu>
        <van-uploader
          v-if="selectVal===0"
          v-model="fileList"
          accept="image/*"
          :after-read="afterRead"
          :before-read="beforeRead"
          multiple
          :max-count="9" />
        <van-uploader
          v-if="selectVal===1"
          v-model="fileList"
          accept="video/*"
          :after-read="afterRead"
          :before-read="beforeRead"
          multiple
          :max-count="1" />
      </div>
      <div class="form-item-btn" @click="submit()">
        提 交
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      titleVal: '',
      selectVal: 0,
      selectArr: [],
      textVal: '',
      fileLen: 9,
      selectList: [
        { text: '图片', value: 0 },
        { text: '视频', value: 1 }
      ],
      tagList: [
        { text: '蔼儿舒', value: 0 },
        { text: '蔼儿舒', value: 1 },
        { text: '蔼儿舒', value: 2 },
        { text: '蔼儿舒', value: 3 },
        { text: '蔼儿舒', value: 4 },
        { text: '蔼儿舒', value: 5 },
        { text: '蔼儿舒', value: 6 }
      ],
      tagList1: [
        { text: '蔼儿舒', value: 7 },
        { text: '蔼儿舒', value: 8 },
        { text: '蔼儿舒', value: 9 }
      ],
      fileList: [],
      fileVals: []
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
    selectClick () {

    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(this.imgFileList, file)
    },
    beforeRead (file) {
      let FileExt = file.name.replace(/.+\./, '')
      let isLimit = file.size / 1024 / 1024 <= 100
      console.log(file)
      if (this.selectVal === 0) {
        if (['jpg', 'png', 'jpeg', 'pic', 'tif', 'bmp', 'gif'].indexOf(FileExt.toLowerCase()) === -1) {
          this.$toast.fail('请上传图片')
          return false
        }
      }
      if (this.selectVal === 1) {
        if (['mp4', 'avi'].indexOf(FileExt.toLowerCase()) === -1) {
          this.$toast.fail('请上传视频')
          return false
        }
      }
      if (!isLimit) {
        this.$toast.fail('上传文件不能超过100M')
        return false
      }

      return true
    },
    selectTag (item) {
      let that = this
      if (typeof item.checked === 'undefined') {
        this.$set(item, 'checked', true)
      } else {
        item.checked = !item.checked
      }
      if (item.checked) {
        that.selectArr.push(item.value)
      } else {
        for (var i = 0; i < that.selectArr.length; i++) {
          if (that.selectArr[i] === item.value) {
            that.selectArr.splice(i, 1)
          }
        }
      }
    },
    submit () {
      let data = {
        title: this.titleVal.trim(),
        selectArr: this.selectArr,
        fileVals: this.fileVals
      }
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
.team-issue {
  width: 100vw;
  padding-bottom: 20px;
  background: #f5f5f5;
}
.item-title {
  display: flex;
}
.form-item {
  padding-top: 10px;
  input {
    padding: 0.21333rem 0.13333rem;
    border: 1px solid #666;
    border-radius: 2px;
    background: transparent;
  }
}
.form-item-laber {
  margin-right: 10px;
  line-height: 36px;
  font-size: 14px;
  color: #00c1b2;
}
.van-search {
  flex: 1;
  padding: 0;
}
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
    border: 1px solid #00c1b2;
    background: #00c1b2;
    color: #fff;
  }
}
.textarea-box textarea {
  width: 325px;
  height: 96px;
  padding: 5px;
  border: 1px solid #00c1b2;
  border-radius: 10px;
  font-size: 12px;
}
.uploader-box {
  min-height: 4.2rem;
  padding-top: 0;
}
.form-item-btn {
  width: 255px;
  height: 38px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 7px 0px rgba(102, 102, 102, 0.3);
  border-radius: 34px;
  font-size: 15px;
  text-align: center;
  line-height: 38px;
}
</style>
