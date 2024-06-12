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
      <h2 style="text-align: center">健康生活中心</h2>
      <van-grid column-num="2">
        <van-grid-item
            v-for="(item, index) in healthCenterData"
            :key="index"
            :icon="item.icon"
            :text="item.text"
            @click="goToPage(item.path)"
        >
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 个人健康档案 -->
    <div className="health-assessment">
      <h2 style="text-align: center">个人健康档案</h2>
      <van-grid column-num="2">
        <van-grid-item
            v-for="(item, index) in healthAssessmentData"
            :key="index"
            :icon="item.icon"
            :text="item.text"
            @click="goToPage(item.path)"
        >
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 体检专区 -->
    <!--<div className="physical-exam">-->
    <!--  <h2>体检专区</h2>-->
    <!--  <van-button type="primary" @click="goToPage('physical-exam')">去看看</van-button>-->
    <!--</div>-->
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
  { text: '健康课堂', path:'/health/class',icon:'tv-o' },
  { text: '运动打卡', path:'/health/sport',icon:'calendar-o'},
]);

const healthAssessmentData = ref([
  // 这里可以添加健康测评的数据
  // { text: '...', path: '...' },
  {text:'病例清单',icon:'label-o',path:'/health/caseList'},
  {text:'身体情况表',icon:'bookmark-o',path: '/health/physicalTab'}
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
  //padding: 20px;
}

.health-center, .health-assessment, .physical-exam {
  margin-top: 20px;
}
</style>


