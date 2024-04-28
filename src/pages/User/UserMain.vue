<template>
  <div class="my">
    <!-- 个人信息区域 -->
    <div class="top" :style="`background: ${user.gender === 2 ? '#ff5722' : '#00bcd4' };`">
      <div class="msg" @click="openAvatar">
        <van-image
            round
            width="8rem"
            height="8rem"
            :src="user.userAvatar"
        />
      </div>
      <div class="user-info">
        <!-- 根据性别显示不同的标签 -->
        <van-tag :type="getTagType(user.gender)">{{ getTagText(user.gender) }}</van-tag>
        &nbsp;
        <van-tag type="success">{{ getTagRole(user.role) }}</van-tag>
        <h2>{{user.username}}</h2>

      </div>
    </div>
    <h4>介绍：{{user.signature}}</h4>
    <!-- 收藏区域 -->
    <van-grid :column-num="3">
      <van-grid-item icon="star-o" text="收藏" to="/collection" />
      <van-grid-item icon="clock-o" text="历史" to="/history" />
      <van-grid-item icon="orders-o" text="作品" to="/works" />
    </van-grid>
    <!-- 信息区域 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link to="/messages" />
      <van-cell title="用户反馈" is-link to="/feedback" />
      <van-cell title="小智同学" is-link to="/xiaozhi" />
    </van-cell-group>
    <div style="height: 20px"></div>
    <!--退出登录-->
    <van-button class="userLogout" color="linear-gradient(to right, #ff6034, #ee0a24)" @click="logout()">
      退出登录
    </van-button>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {useUserStore} from "../../config/store.js";
//获取store信息
const userStore = useUserStore();
// const isLoggedIn = userStore.isLoggedIn;
// const userAccount =userStore.userAccount;
// console.log("Login？",isLoggedIn);
// console.log("userAccount",userAccount);
const router = useRouter();
const user = ref({
  userAccount: 'admin',
  username: '菜狗',
  userAvatar: 'https://foruda.gitee.com/avatar/1676566705652498709/9913536_xiao-chenago_1676566705.png!avatar200',
  signature: '爱打篮球,菜就多练',
  gender: 1,
  role: 0
});

// 根据性别获取标签类型
const getTagType = (gender) => {
  if (gender === 1) return 'primary';
  if (gender === 2) return 'danger';
  return 'warning'; // 默认或其他情况
};

// 根据性别获取标签文本
const getTagText = (gender) => {
  if (gender === 1) return '男';
  if (gender === 2) return '女';
  return '未知'; // 默认或其他情况
};
// 根据角色获取标签
const getTagRole = (role) => {
  if (role === 0) return '用户';
  if (role === 1) return '医生';
  if (role === 2) return '药剂师';
  if (role === 3) return '管理员';
  return '未知'; // 默认或其他情况
};
// 打开个人中心页面
const openAvatar = async () => {
  await router.push('/user/info');
};
// 退出登录
const logout= async ()=>{
  userStore.logout()
  await router.push('/user')
}
</script>

<style scoped>
.my {
  padding: 1rem;
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:20px 50px 20px 50px;
  border-radius: 8px;
}
.msg {
  display: flex;
}
.userLogout {
  text-align: center;
  display: inline-block;
  width: 80%;
  margin-left: 35px;
  background: linear-gradient(to right, #ff6034, #ee0a24); /* 渐变背景色 */
  color: white; /* 文字颜色 */
  border: none; /* 移除边框 */
  border-radius: 20px; /* 圆角 */
  font-size: 16px; /* 字体大小 */
  padding: 20px 20px; /* 内边距 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, .1); /* 添加阴影效果 */
  transition: box-shadow 0.3s ease-in-out; /* 平滑阴影过渡效果 */
}

.userLogout:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* 鼠标悬浮时阴影效果增强 */
}
.user-info span {
}
</style>