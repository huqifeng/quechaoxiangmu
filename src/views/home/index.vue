<template>
  <div class="home">
    <van-nav-bar title="首页" />
    <!-- banner -->
    <div class="img-box" v-if="bannerList.length>0">
      <van-swipe :autoplay="3000" indicator-color="#969799" style="height: 158px;">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index" @click="bannerClick(item)">
          <img v-lazy="item.img_url" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- banner -->
    <div class="link-box">
      <router-link to="/forum" class="forum-link">
        <h2>论坛</h2>
        <p>一个图书馆，一个聊天室，进行实时的信息交流</p>
        <img src="../../assets/forum_icon.png" />
      </router-link>
      <div class="list-wrap">
        <div class="list">
          <router-link to="/experience" class="experience-link">
            <h2>经验分享</h2>
            <p>精英成长计划</p>
            <img src="../../assets/experience_icon.png" />
          </router-link>
          <router-link to="/personalCenter" class="personal-link">
            <h2>个人中心</h2>
            <p>我的成长值赠送记录</p>
            <img src="../../assets/personal_icon.png" />
          </router-link>
        </div>
        <div class="list">
          <router-link to class="classroom-link">
            <h2>学术课堂</h2>
            <p>学术沃土学科前沿</p>
            <img src="../../assets/classroom_icon.png" />
          </router-link>
          <router-link to="/team" class="team-link">
            <h2>团队展示</h2>
            <p>SHOW出你的风采</p>
            <img src="../../assets/team_icon.png" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user";
import { getBanner } from "@/api/classroom";
import {
  getLocalStorage,
  getSessionStorage,
  setSessionStorage
} from "@/utils/util";
export default {
  name: "home",
  components: {},
  data() {
    return {
      baseUrl: window.baseUrl,
      bannerList: []
    };
  },
<<<<<<< HEAD
  mounted() {
    if (getSessionStorage("token").length == 0) {
      let token = getSessionStorage("token");
      if (token.length === 0) {
        this.login();
      } else {
        this.getBannerList();
      }
    }
  },
  methods: {
    login() {
      let data = getLocalStorage("userInfo");
      // 登录
      getUserInfo(data)
        .then(res => {
          debugger;
          setSessionStorage("token", res.token);
          this.getBannerList();
        })
        .catch(err => {
          console.log(err);
        });
=======
  mounted () {
      let token = getSessionStorage('token')
      console.log(token.length)
      if(token.length === 0){
        this.login()
      } else {
        this.getBannerList()
      }
      
>>>>>>> ff6a49ea6e0985096904f0a5c033e13d8402b450
    },
  methods: {
    login () {
          let data = getLocalStorage('userInfo')
          // 登录
          getUserInfo(data).then(res => {
            setSessionStorage('token', res.token)
            this.getBannerList()
          }).catch(err => {
            console.log(err)
          })
        },
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    onClickLeft() {
      this.goBack();
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
    getBannerList() {
      getBanner({ cid: 1 })
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
    }
  }
};
</script>
<style lang="less" scoped>
.img-box .van-swipe-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.home {
  background-color: #fff;
}
.link-box {
  padding: 10px 5px;
}
.list-wrap {
  display: flex;
  justify-content: space-between;
}
.list {
  width: 49%;
}
.forum-link,
.experience-link,
.personal-link,
.classroom-link,
.team-link {
  display: block;
  position: relative;
  padding: 19px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
  h2 {
    margin-bottom: 10px;
    font-size: 24px;
  }
  p {
    font-size: 12px;
  }
  img {
    position: absolute;
  }
}
.forum-link {
  height: 120px;
  background: #d1fbf8;
  h2 {
    color: #15bdb1;
  }
  p {
    width: 150px;
    font-size: 12px;
    color: #39c7bc;
  }
  img {
    right: 20px;
    bottom: 14px;
    width: 54px;
    height: 61px;
  }
}
.experience-link {
  height: 160px;
  background: #fbe4ac;
  h2 {
    color: #ff9900;
  }
  p {
    color: #de9f04;
  }
  img {
    width: 48px;
    height: 50px;
    right: 16px;
    bottom: 16px;
  }
}
.personal-link {
  height: 122px;
  background: #bef8c2;
  h2 {
    color: #0eb61a;
  }
  p {
    color: #30c03a;
  }
  img {
    width: 52px;
    height: 42px;
    right: 18px;
    bottom: 12px;
  }
}
.classroom-link {
  height: 126px;
  background: #f7ceb7;
  h2 {
    color: #ff5432;
  }
  p {
    color: #cf2503;
  }
  img {
    width: 52px;
    height: 45px;
    right: 16px;
    bottom: 14px;
  }
}
.team-link {
  height: 160px;
  background: #fdbfda;
  h2 {
    color: #dd2279;
  }
  p {
    color: #e53880;
  }
  img {
    width: 61px;
    height: 55px;
    right: 20px;
    bottom: 22px;
  }
}
</style>
