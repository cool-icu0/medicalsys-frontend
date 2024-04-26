<template>
  <!--顶部导航栏-->
  <van-nav-bar
      title="标题"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <!--主页内容-->
  <div id="content">
    <router-view/>
  </div>
  <!--底部导航栏-->
  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/find" icon="search" name="find">发现</van-tabbar-item>
    <van-tabbar-item to="/health" icon="search" name="health">健康</van-tabbar-item>
    <van-tabbar-item to="/message" icon="search" name="message">消息</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import {showToast} from "vant";
import {useRouter} from "vue-router";
const router =useRouter();
const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push('/search')
};
const onChange = (index) => showToast(`标签 ${index}`);

</script>

<style scoped>

</style>
