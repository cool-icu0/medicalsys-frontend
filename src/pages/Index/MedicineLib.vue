<template>
  <!-- 搜索栏 -->
  <van-search
      placeholder="搜一搜药品/疫苗"
      shape="round"
      @click="onSearch"
  />
  <div  v-if="data.searchResults!=''">
    <h2>当前药品列表</h2>
    <!-- 分页控件 -->
    <van-pagination v-model="data.currentPage" :page-count="pageCount" mode="simple" @change="handlePageChange" />
    <div>
      <van-card v-for="result in data.searchResults"
                :num="result.quantity"
                :price="result.unitPrice.toFixed(2)"
                :desc="result.description"
                :title="result.medicineName"
                :thumb="result.imgUrl"
      >
        <template #tags>
          <van-tag plain type="primary">制造商:{{ result.manufacturer }}</van-tag>
        </template>
      </van-card>
      <p class="medicalLib"></p>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import MyAxios from "../../config/myAxios.js";
import {useRouter} from "vue-router";
const router = useRouter();

const data = ref({
  searchResults: [],
  currentPage: 1,
  pageSize: 4, // 每页显示4条记录
});
const pageCount = ref(12); // 假设总共有12页
onMounted(()=>{
  getData(data.value.currentPage)
})

const getData =async (pageNum) => {
  try {
    const response = await MyAxios.get( `/api/v1/medicine/allMedicinePager2?pageNum=${pageNum}&pageSize=${data.value.pageSize}`);
    data.value.searchResults = response.data.data.list;
    console.log(data.value.searchResults)
    pageCount.value = Math.ceil(response.data.data.total / data.value.pageSize);
  } catch (error) {
    console.error('Error fetching search results:', error);
    data.value.searchResults = []; // 清空搜索结果以显示错误信息
  }
}
const handlePageChange = (newPage) => {
  data.value.currentPage = newPage;
  getData(newPage);
};
const onSearch = () => {
  router.push('/health/search');
};
</script>

<style scoped>
.medicalLib{
  padding-top: 10px;
  padding-bottom: 57px;
  display: flex;
  flex-direction: column
}
</style>