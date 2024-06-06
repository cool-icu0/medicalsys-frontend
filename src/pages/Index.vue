<template>
  <div class="app">
    <div class="header">
      <!-- 假设有一个用户头像和名称 -->
      <div class="user-info">
        <img src="https://foruda.gitee.com/avatar/1676566705652498709/9913536_xiao-chenago_1676566705.png!avatar200" alt="User" class="avatar" />
      </div>
      <div class="search-bar">
        <!-- Vant UI 的搜索框 -->
        <van-search placeholder="找医生、找药品" shape="round" />

      </div>
    </div>
    <div class="content">
      <!-- 功能模块 -->
      <van-grid column-num="3" icon-size="30px" border="border">
        <van-grid-item
            v-for="item in features"
            :key="item.text"
            :icon="item.icon"
            :text="item.text"
            :to="`/${item.route}`"
        />
      </van-grid>

      <!-- 优惠券和活动区域 -->
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
        <van-cell title="京东体检" is-link />
        <van-cell title="签到奖励" is-link />
        <van-cell title="用药助手" is-link />
        <!-- 更多功能可以继续添加 -->
      </van-list>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import "../assets/font/iconfont.css";
const features = ref([
  // 功能模块数据，需要根据实际图标和文本替换
  { icon: 'friends', text: '极速问诊', route: 'index/feature' }, // 添加route属性
  // { icon: 'like', text: '找医生', route: 'find-doctor' },
  { icon: 'shop', text: '药品库', route: 'index/medicineLib' },
  { icon: 'like', text: '健康管理', route: 'index/healthManagement' },
  // 更多功能模块可以继续添加
]);
const specialist = ref([
  { icon: 'friends', text: '私人医生' },
  { icon: 'like', text: '专病义诊' },
  { icon: 'shop', text: '保险平台' },
  { icon: 'like', text: '报告解读' },
  { icon: 'friends', text: '银联支付' },
  { icon: 'like', text: '中医医院' },
  { icon: 'shop', text: '心理咨询' },
  { icon: 'like', text: '联系客服' },
])

const onFeatureClick = (item) => {
  console.log('Clicked feature:', item.text);
  // 可以在这里添加点击模块后的操作
};
</script>

<style scoped>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
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

.content {
  margin-top: 20px;
}

/* 其他样式可以根据需要添加 */
</style>