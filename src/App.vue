<template>
  <div id="app">
    <!--网站导航-->
    <Header v-if="this.$route.meta.headerShow"></Header>
    <Revert v-if="this.$route.meta.revertShow"></Revert>
    <!--导航内容-->
    <div :class="{'container-hh': this.$route.meta.headerShow, 'container-nh': !this.$route.meta.headerShow}">
      <router-view></router-view>
      <Footer v-show="this.$route.meta.footerShow"></Footer>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import Footer from "@/components/Footer/index";
  import Revert from "@/components/Revert/index";
export default {
  name: 'App',
  components: {Revert, Footer, Header}
}
</script>

<style lang="less">
  #app {
    /*解决margin-top塌陷问题*/
    overflow: hidden;
    .container-hh {//有头部导航都样式
      margin-top: 55px;
      background-color: #F7F7F7;
      height: calc(100vh - 55px);
      overflow: auto;
    }
    .container-nh {//没有头部导航都样式
      background-color: #F7F7F7;
      height: 100vh;
      overflow: auto;
    }
  }
  /*设置滚动条样式*/
  /*#app::-webkit-scrollbar {!*设置滚动条整体属性*!*/
  /*  width: 0;*/
  /*}*/
</style>
