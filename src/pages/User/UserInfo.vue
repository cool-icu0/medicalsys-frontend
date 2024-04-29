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
  <van-cell title="生日" :value="formatBirthday(user.birthday)"/>

</template>

<script setup >

import {useRouter} from "vue-router";
import {useUserStore} from "../../config/store.js";
import myAxios from "../../config/myAxios.js";
import {onMounted, ref} from "vue";

//获取store信息
const userStore = useUserStore();
const isLoggedIn = userStore.isLoggedIn;
const userAccount =userStore.userAccount;
const user=ref({
  username:'',
  userAccount:userAccount,
  fullName:'',
  userAvatar:'',
  gender:0,
  phone:'',
  email:'',
  signature:'',
  age:18,
  role:1,
  birthday:new Date(),
})
const router = useRouter();

const toEdit = (editKey, editName, currentValue) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
const getData= async (userAccount)=>{
  const res = await myAxios.get(`/user/select/${userAccount}`);
  if (res.data.code === 200 && res.data.data) {
    user.value.username = res.data.data.username;
    user.value.fullName = res.data.data.fullName;
    user.value.userAvatar = res.data.data.userAvatar;
    user.value.signature = res.data.data.signature;
    user.value.gender = res.data.data.gender;
    user.value.phone = res.data.data.phone;
    user.value.email = res.data.data.email;
    user.value.age = res.data.data.age;
    user.value.role = res.data.data.role;
    user.value.birthday = res.data.data.birthday;
  }
}
onMounted( async ()=>
    getData(userAccount),
)
//日期格式化
const formatBirthday = (birthday) => {
  const date = new Date(birthday);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份需要加1，且保证两位数显示
  const day = date.getDate().toString().padStart(2, '0'); // 日期保证两位数显示
  return `${year}年${month}月${day}日`;
};

</script>

<style scoped>

</style>