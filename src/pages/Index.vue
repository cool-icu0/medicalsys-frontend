<template>
  <div class="app">
    <div class="header">
      <!-- 假设有一个用户头像和名称 -->
      <div class="user-info">
        <!--{{user.avatarUrl}}-->
        <img :src=userAvatar class="avatar" />
      </div>
      <div class="search-bar">
        <!-- Vant UI 的搜索框 -->
        <van-search placeholder="找医生、找药品" shape="round" />
      </div>
    </div>
      <!--这里是提示栏-->
      <van-notice-bar
          color="#1989fa"
          background="#ecf9ff"
          left-icon="volume-o"
          style="margin-bottom: 10px"
          text="富强、民主、文明、和谐；自由、平等、公正、法治；爱国、敬业、诚信、友善。"
      />
      <!--这里是轮播图-->
      <van-swipe class="my-swipe" :autoplay="4000" indicator-color="white" lazy-render
                 style="width: 90%;height: 150px;margin: 0 auto">
        <van-swipe-item v-for="image in images" :key="image">
          <img :src="image" style="width: 100%;height: 150px"/>
        </van-swipe-item>
      </van-swipe>
    <div>
      <!-- 功能模块 -->
      <van-grid column-num="3" icon-size="30px" border="border">
        <van-grid-item
            v-for="item in features"
            :key="item.text"
            :icon="item.icon"
            :text="item.text"
            :to="`${item.route}`"
        />
      </van-grid>

      <!-- 区域 -->
      <van-cell-group>
        <van-cell title="专病专科" value="查看全部" is-link />
        <van-grid column-num="4" icon-size="30px" border="border" clickable>
          <van-grid-item
              v-for="item in specialist"
              :key="item.text"
              :icon="item.icon"
              :text="item.text"
              @click="onFeatureClick(item)"
          />
        </van-grid>
      </van-cell-group>

      <van-list>
        <van-cell title="秒送" is-link />
        <van-cell title="到家快检" is-link />
        <van-cell title="签到奖励" is-link />
        <van-cell title="用药助手" is-link />
        <!-- 更多功能可以继续添加 -->
      </van-list>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter();
import {onMounted, ref} from 'vue';
import "../assets/font/iconfont.css";
import getCurrent from "../services/currentUser";
const userAvatar= ref('');
onMounted(async () => {
  const user = await getCurrent()
  userAvatar.value = user.data.userAvatar
  console.log("userAvatar", userAvatar)
})

const DEFAULT_IMG="https://foruda.gitee.com/avatar/1676566705652498709/9913536_xiao-chenago_1676566705.png!avatar200";
const images = [
  "https://img0.baidu.com/it/u=3358848204,1936258606&fm=253&fmt=auto&app=120&f=JPEG?w=1421&h=800",
  "https://img2.baidu.com/it/u=3012806272,1276873993&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
  "https://img0.baidu.com/it/u=741268616,1401664941&fm=253&fmt=auto&app=138&f=JPEG?w=748&h=500",
  "https://img1.baidu.com/it/u=2389614815,1145894179&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800"
]
const features = ref([
  // 功能模块数据，需要根据实际图标和文本替换
  { icon: 'friends-o', text: '极速问诊', route: '/index/feature' }, // 添加route属性
  // { icon: 'like', text: '找医生', route: 'find-doctor' },
  { icon: 'shopping-cart-o', text: '药品库', route: '/index/medicineLib' },
  { icon: 'like-o', text: '健康管理', route: '/health' },
  // 更多功能模块可以继续添加
]);
const specialist = ref([
  { icon: 'manager-o', text: '私人医生',path:'/message/myDoc' },
  { icon: 'notes-o', text: '专病义诊' ,path: '/'},
  { icon: 'cashier-o', text: '医疗百科',path: '/index/medicalAny' },
  { icon: 'todo-list-o', text: '报告解读',path: '/' },
  { icon: 'cash-o', text: '银联支付',path: '/' },
  { icon: 'shop-o', text: '中医医院',path: '/' },
  { icon: 'closed-eye', text: '心理咨询',path: '/' },
  { icon: 'question-o', text: '联系客服',path: '/' },
])

const onFeatureClick = (item) => {
  console.log('Clicked feature:', item.text);
  router.push(item.path)
  // 可以在这里添加点击模块后的操作
};
</script>

<style scoped>
.app {
  //max-width: 600px;
  //margin: 0 auto;
  //padding: 10px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin-right: 10px;
}

.search-bar {
  flex: 1;
  padding: 0 10px;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

/* 其他样式可以根据需要添加 */
</style>