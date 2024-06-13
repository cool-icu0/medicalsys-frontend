<template>
  <div v-if="data.searchResults.length > 0">
    <h2>当前病历列表</h2>
    <!-- 分页控件 -->
    <van-pagination v-model="data.currentPage" :page-count="pageCount" mode="simple" @change="handlePageChange" />
    <div class="case-list">
      <!-- 展示当前页的内容 -->
      <div v-for="result in data.searchResults" class="caseList">
        <h3 class="caseList-name"> <strong>医生：</strong>{{ result.doctorName }}</h3>
        <p><strong>病情:</strong> {{ result.medicalCondition }}</p>
        <p><strong>所属医院：</strong> {{ result.hospitalName }}</p>
        <p><strong>科室：</strong> {{ result.treatment }}</p>
        <p><strong>经验年数：</strong> {{ result.diagnosisDate }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import MyAxios from '../../config/myAxios.js';

const data = ref({
  searchResults: [],
  currentPage: 1,
  pageSize: 2, // 每页显示1条记录
});

const pageCount = ref(12); // 假设总共有12页


onMounted(() => {
  getData(data.value.currentPage);
});

const getData = async (pageNum) => {
  try {
    const response = await MyAxios.get(`/api/v1/mediHistory/allWaterFreePager2?pageNum=${pageNum}&pageSize=${data.value.pageSize}`);
    data.value.searchResults = response.data.data.list;
    console.log("值：",data.value.searchResults)
    // pageCount.value = (response.data.data.total)/2; // 假设API返回了总页数
    pageCount.value = Math.ceil(response.data.data.total / data.value.pageSize);
  } catch (error) {
    console.error('Error fetching search results:', error);
    data.value.searchResults = [];
  }
};

const handlePageChange = (newPage) => {
  data.value.currentPage = newPage;
  getData(newPage);
};
</script>

<style scoped>
.medicalLib{
  padding-top: 10px;
  padding-bottom: 57px;
  display: flex;
  flex-direction: column
}
.caseList{
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  width: calc(100% - 40px); /* 根据父容器宽度自适应 */
  max-width: 300px; /* 最大宽度限制 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; /* 每个卡片下边距 */
}
.case-list {
  display: flex;
  flex-direction: column;
  align-items: center; /* 垂直居中所有子元素 */
}
</style>