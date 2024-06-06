<template>
  <div id="app">
    <!-- 搜索栏 -->
    <van-search
        placeholder="搜一搜疾病/药品/医院/疫苗"
        shape="round"
        @click="onSearch"
    />

    <!-- 导航菜单 -->
    <van-grid column-num="4" square>
      <van-grid-item
          v-for="(item, index) in gridData"
          :key="index"
          icon="photo-o"
          :text="item.text"
          @click="goToPage(item.path)"
      >
      </van-grid-item>
    </van-grid>

    <!-- 健康生活中心 -->
    <div className="health-center">
      <h2>健康生活中心</h2>
      <van-grid column-num="2" square>
        <van-grid-item
            v-for="(item, index) in healthCenterData"
            :key="index"
            icon="points"
            text="去答题"
            @click="goToPage('health-center')"
        >
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 健康测评 -->
    <div className="health-assessment">
      <h2>健康测一测</h2>
      <van-grid column-num="2" square>
        <van-grid-item
            v-for="(item, index) in healthAssessmentData"
            :key="index"
            icon="service-o"
            text="测测你的抑郁指数"
            @click="goToPage('health-assessment')"
        >
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 体检专区 -->
    <div className="physical-exam">
      <h2>体检专区</h2>
      <van-button type="primary" @click="goToPage('physical-exam')">去看看</van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const gridData = ref([
  { text: '查疾病', path: '/health/disease' },
  { text: '查药品', path: '/health/medicine' },
  { text: '查医院', path: '/health/hospital' },
  { text: '查疫苗', path: '/health/vaccine' }
]);

const healthCenterData = ref([
  // 这里可以添加健康生活中心的数据
  // { text: '...', path: '...' },
]);

const healthAssessmentData = ref([
  // 这里可以添加健康测评的数据
  // { text: '...', path: '...' },
]);

const onSearch = () => {
  router.push('/health/search');
};

const goToPage = (path) => {
  router.push(path);
};
</script>

<style scoped>
#app {
  padding: 20px;
}

.health-center, .health-assessment, .physical-exam {
  margin-top: 20px;
}
</style>


