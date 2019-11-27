<template>
  <div class="team team-issue">
    <van-nav-bar title="团队展示" left-arrow @click-left="onClickLeft" />
    <div class="wrap">
      <div class="form-item item-title">
        <span class="form-item-laber">标题</span>
        <van-search left-icon placeholder="请输入" v-model="titleVal" />
      </div>
      <!-- <div class="form-item tag-box">
        <span class="form-item-laber">标签</span>
        <div>
          <span
            v-for="(item, index) in tagList"
            :key="index"
            @click="selectTag(item)"
            class="tag"
            :class="{active:item.checked}">{{item.tag_name}}</span>
        </div>
      </div>-->
      <div class="form-item uploader-box">
        <van-dropdown-menu active-color="#DD2279">
          <van-dropdown-item
            v-model="selectVal"
            :disabled="fileList.length>0"
            :options="selectList"
            @click="selectClick()"
          />
        </van-dropdown-menu>
        <van-uploader
          v-if="selectVal===1"
          v-model="fileList"
          accept="image/*"
          :after-read="afterRead"
          :before-read="beforeRead"
          @delete="fileDelete"
          multiple
          :max-count="9"
        />
        <van-uploader
          v-if="selectVal===2"
          v-model="fileList"
          accept="video/*"
          :after-read="afterRead"
          :before-read="beforeRead"
          @delete="fileDelete"
          multiple
          :max-count="1"
        />
      </div>
      <div class="form-item-btn" @click="submit()">提 交</div>
    </div>
  </div>
</template>

<script>
import { getTags, addTmposts, fileUpload } from "@/api/team";
export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  data() {
    return {
      titleVal: "",
      selectVal: 2,
      selectArr: [],
      fileLen: 9,
      selectList: [{ text: "图片", value: 1 }, { text: "视频", value: 2 }],
      tagList: [],
      fileList: [],
      fileVals: []
    };
  },
  mounted() {
    this.getTag();
  },
  methods: {
    getTag() {
      getTags({
        tag_type: 2,
        select_mode: 1
      })
        .then(res => {
          this.tagList = res.data;
        })
        .catch(err => {
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
    selectClick() {},
    fileDelete(file, detail) {
      // 删除文件预览时
      this.fileVals.splice(detail.index, 1);
    },
    afterRead(res) {
      this.$toast.loading({
        duration: 0,
        message: "上传中...",
        forbidClick: true
      });
      // 此时可以自行将文件上传至服务器
      let formData = new FormData();
      formData.append("imgFileName", res.file);
      fileUpload(formData)
        .then(res => {
          this.$toast.clear();
          this.$toast.success("上传成功");
          this.fileVals.push(res.data.picUrl);
        })
        .catch(err => {
          console.log(err);
        });
    },
    beforeRead(file) {
      if (file.length > 1) {
        this.$toast.fail("请选择单个文件上传");
        return;
      }
      let FileExt = file.name.replace(/.+\./, "");
      let isLimit = file.size / 1024 / 1024 <= 100;
      console.log(file);
      if (this.selectVal === 1) {
        if (
          ["jpg", "png", "jpeg", "pic", "tif", "bmp", "gif"].indexOf(
            FileExt.toLowerCase()
          ) === -1
        ) {
          this.$toast.fail("请上传图片");
          return false;
        }
      }
      if (this.selectVal === 2) {
        if (["mp4", "avi"].indexOf(FileExt.toLowerCase()) === -1) {
          this.$toast.fail("请上传视频");
          return false;
        }
      }
      if (!isLimit) {
        this.$toast.fail("上传文件不能超过100M");
        return false;
      }
      return true;
    },
    selectTag(item) {
      let that = this;
      if (typeof item.checked === "undefined") {
        this.$set(item, "checked", true);
      } else {
        item.checked = !item.checked;
      }
      if (item.checked) {
        that.selectArr.push(item.id);
      } else {
        for (var i = 0; i < that.selectArr.length; i++) {
          if (that.selectArr[i] === item.id) {
            that.selectArr.splice(i, 1);
          }
        }
      }
    },
    submit() {
      console.log(this.fileVals);
      let data = {
        block_id: 3,
        type_id: this.selectVal,
        title: this.titleVal.trim(),
        img_url: this.fileVals
        // region_id: this.userInfo.region_id,
        // title: this.titleVal.trim(),
        // tags: this.selectArr.join(","),
        // tm_post_type: this.selectVal,
        // img_dir: this.fileVals.join(",")
      };
      // console.log(data);
      addTmposts(data)
        .then(res => {
          let _this = this;
          if (res.code === 200) {
            this.$toast.success("发布成功，恭喜您成功获得10积分！");
            setTimeout(function() {
              _this.goBack();
            }, 500);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.team-issue {
  width: 100vw;
  height: 100vh;
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
  color: #cb206f;
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
    border: 1px solid #dd2279;
    background: #dd2279;
    color: #fff;
  }
}
.uploader-box {
  height: 270px;
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
