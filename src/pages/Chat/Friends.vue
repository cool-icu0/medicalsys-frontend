<script setup>

import {onMounted, ref} from "vue";
import getCurrent from "../../services/currentUser";
import {defaultPicture} from "../../components/userCommon";
import {useRouter} from "vue-router";
import myAxios from "../../config/myAxios.js";
import {useUserStore} from "../../config/store.js";
let doctor =[]
const router = useRouter()
const status = ref({
  loginUser: {},
  friends: [],
  searchText: ''
})


const showUser = (id) => {
  router.push({
    name: 'userShow',
    params: {
      userId: id
    }
  })
}
const getRoleName=(role)=> {
  const roleMap = {
    0: '用户',
    1: '医生',
    2: '药剂师',
    3: '管理员'
  }
  return roleMap[role] ||'测试';
  // 返回对应角色的描述，如果角色值不在映射中，返回 '未知角色'
}

// 定义搜索函数
const search = () => {
  const searchKeyword = status.value.searchText.trim().toLowerCase();
  if (searchKeyword === '') {
    // 如果搜索内容为空，则显示所有用户
    status.value.friends = doctor;
  } else {
    // 如果搜索内容不为空，则执行模糊匹配搜索
    status.value.friends = doctor.filter(user =>
        user.username && user.username.toLowerCase().includes(searchKeyword)
    );
  }
};
const userStore = useUserStore();
const userAccount =userStore.userAccount;

onMounted(async () => {
  status.value.loginUser = await getCurrent();
  const res =(await myAxios.get("/user/getUserList"))
  doctor=filterUsersByRole(res .data.data)
  status.value.friends =doctor
  console.log("数据：",status.value.friends)
})
const filterUsersByRole=(a)=>{
  return a.filter(user => user.role !== 0 && user.userAccount!==userAccount)
}

const chat = (id, username) => {
  router.push({
    path: "/message/common",
    query: {
      id: id,
      username: username,
      userType: 1
    }
  })
}

const changeColor = (event) => {
  event.currentTarget.style.backgroundColor = '#e6e6e6';
}

const resetColor = (event) => {
  event.currentTarget.style.backgroundColor = '#fff';
}
</script>

<template>
  <div class="friend-list">
    <div class="friend-search">
      <input type="text" placeholder="搜索" @keyup.enter="search" v-model="status.searchText">
      <van-button plain hairline size="small" style="width: 60px" @click="search" type="primary">搜索</van-button>
    </div>
    <div class="friend-group">
      <div class="group-title">我的好友</div>
      <ul class="friend-items">
        <van-empty v-if="status.friends.length<=0" description="暂无好友"/>
        <li v-else v-for="friend in status.friends" :key="friend.userId"
            class="friend-item"
            @mousedown="changeColor($event)"
            @touchstart="changeColor($event)" @mouseup="resetColor($event)" @touchend="resetColor($event)">
          <div class="avatar-container">
            <img @click="showUser(friend.userId)"
                 :src="friend.avatarUrl??defaultPicture" class="avatar">
          </div>
          <div class="friend-info">
            <div @click="showUser(friend.userId)" class="friend-name">
              {{ friend.username }}
              <van-tag type="primary">{{getRoleName(friend.role)}}</van-tag>
            </div>
            <div style="padding-right: 10px;" @click="chat(friend.userId,friend.username)">
              <van-icon :content="friend.chatCount" max="99" :size="28" name="chat-o"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.friend-list {
  padding: 10px;
}

.group-title {
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
}

.friend-search {
  padding: 10px;
  display: flex;
  align-items: center;
}

.friend-search input[type="text"] {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #e6e6e6;
  font-size: 14px;
}

.friend-group {
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
}

.friend-items {
  list-style: none;
  margin: 0;
  padding: 0;
}

.friend-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e6e6e6;
}

.friend-item:active,
.friend-item:hover {
  background-color: #e6e6e6;
}

.avatar-container {
  width: 40px;
  height: 40px;
  min-width: 40px !important;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.avatar {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.friend-info {
  margin-left: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.friend-name {
  display: flex;
  font-size: 16px;
  font-weight: bold;
  align-items: center;
}

</style>