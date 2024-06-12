<template>
  <!--顶部导航栏-->
  <!--<van-nav-bar-->
  <!--    :title="title"-->
  <!--    left-arrow-->
  <!--    @click-left="onClickLeft"-->
  <!--    @click-right="onClickRight"-->
  <!--&gt;-->
  <!--  <template #right>-->
  <!--    <van-icon name="comment" size="18" />-->
  <!--  </template>-->
  <!--</van-nav-bar>-->

  <van-nav-bar v-if="!NOT_SHOW_NAVBAR_AND_TABBAR.includes(route.path)"  left-arrow
               :title="title" @click-right="onClickRight" @click-left="onClickLeft">
      <template #right>
        <van-icon name="comment" size="18" />
      </template>
  </van-nav-bar>
  <!--主页内容-->
  <div id="content">
    <router-view/>
  </div>
  <!--底部导航栏-->
  <van-tabbar route >
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <!--<van-tabbar-item to="/find" icon="tv-o" name="find">发现</van-tabbar-item>-->
    <van-tabbar-item to="/health" icon="records-o" name="health">健康</van-tabbar-item>
    <!--<van-tabbar-item to="/message" icon="comment-o" name="message">消息</van-tabbar-item>-->
    <van-tabbar-item to="/user" icon="friends-o" name="user">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import {showToast} from "vant";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
const DEFAULT_TITLE= 'i医康-你的健康管家'
const title = ref(DEFAULT_TITLE);
const router =useRouter();
const route =useRoute();
const NOT_SHOW_NAVBAR_AND_TABBAR = ["/user/login", '/user/register']
const INDEX_SHOW= ['/']
/**
 * 根据路由切换标题
 */
router.beforeEach((to, from) => {
  title.value = to.meta.title || DEFAULT_TITLE;
  // const toPath = to.meta?.path;
  // const route = routes.find((route) => {
  //   return toPath == route.path;
  // })
  // document.title = "游趣 - 匹配你的趣友"
  // title.value = route?.title ?? DEFAULT_TITLE;
})
const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push('/message')
};
// const onChange = (item) => {
//   // 根据点击的 tabbar-item 的 name 属性来设置标题
//   switch (item.name) {
//     case 'index':
//       title.value = '主页';
//       break;
//     case 'find':
//       title.value = '发现';
//       break;
//     case 'health':
//       title.value = '健康';
//       break;
//     case 'message':
//       title.value = '消息';
//       break;
//     case 'user':
//       title.value = '我的';
//       break;
//     default:
//       title.value = '首页';
//   }
// };

</script>

<style scoped>

</style>
