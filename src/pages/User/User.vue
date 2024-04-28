<template>
  <div>
    <template v-if="isLoggedIn">
      <!-- 用户已登录，显示用户信息界面 -->
      <UserMain />
    </template>
    <template v-else>
      <!-- 用户未登录，显示注册界面 -->
      <UserLogin />
    </template>
  </div>
</template>

<script setup>

import UserLogin from "./UserLogin.vue";
import UserMain from "./UserMain.vue";
import {useUserStore} from "../../config/store.js";

const userStore = useUserStore();
const isLoggedIn = userStore.isLoggedIn;
const userAccount =userStore.userAccount;
console.log("Login？",isLoggedIn);
console.log("userAccount",userAccount);
</script>
