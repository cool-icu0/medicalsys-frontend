<template>
  <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username', '昵称', user.username)"/>
  <van-cell title="账号" :value="user.userAccount"/>
  <van-cell title="真实姓名" :value="user.fullName"/>
  <van-cell title="头像" is-link to="/user/edit">
    <img style="height: 48px" :src="user.userAvatar"/>
  </van-cell>
  <van-cell title="年龄" is-link to="/user/edit" :value="user.age" @click="toEdit('age', '年龄', user.age)"/>
  <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender', '性别', user.gender)"/>
  <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone', '电话', user.phone)"/>
  <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email', '邮箱', user.email)"/>
  <van-cell title="个性签名" is-link to="/user/edit" :value="user.signature" @click="toEdit('signature', '个性签名', user.signature)"/>
  <van-cell title="生日" :value="user.birthday.toISOString()"/>

</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
//获取store信息
// const userStore = useUserStore();
// const isLoggedIn = userStore.isLoggedIn;
// const userAccount =userStore.userAccount;
// console.log("Login？",isLoggedIn);
// console.log("userAccount",userAccount);
const user={
  username:'Cool',
  userAccount:'cool1234',
  fullName:'张三',
  userAvatar:'https://foruda.gitee.com/avatar/1676566705652498709/9913536_xiao-chenago_1676566705.png!avatar200',
  gender:'男',
  phone:'1878348723',
  email:'990299103@qq.com',
  signature:'菜狗之路',
  age:18,
  role:1,
  birthday:new Date(),
}
const router = useRouter();
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

</script>

<style scoped>

</style>