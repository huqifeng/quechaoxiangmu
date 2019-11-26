<template>
  <div class="errPage-container">
    <div class="tips">
      <h1 class="text-jumbo text-ginormous">
        Oops!
      </h1>
      <h2>您没有权限访问该页面,请重新登录</h2>
    </div>
    <div>
      <img :src="errGif" alt="Girl has dropped her ice cream.">
    </div>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'

export default {
  name: 'Page401',
  data () {
    return {
      errGif: errGif
    }
  },
  methods: {
    back () {
      history.go(-2)
    }
  }
}
</script>

<style lang="less" scoped>
.errPage-container {
  padding: 20px 18px 0;
  text-align: center;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .tips h2 {
    text-align: left;
    font-size: 24px;
    padding: 20px 40px;
  }
  img {
    width: 100%;
  }
}
</style>
