<template>
  <div v-if="data.searchResults!=''">
    <h2>当前药品列表</h2>
    <van-card v-for="result in data.searchResults"
              :num="result.quantity"
              :price="result.unitPrice"
              :desc="result.description"
              :title="result.medicineName"
              :thumb="result.imgUrl"
    >
      <template #tags>
        <van-tag plain type="primary">制造商:{{ result.manufacturer }}</van-tag>
      </template>
    </van-card>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import MyAxios from "../../config/myAxios.js";

const data = ref({
  searchResults: [], // 搜索结果
})
onMounted(()=>{
  GetData()
})

const GetData =async () => {
  try {
    const response = await MyAxios.get('/api/v1/medicine/selectAllMedicine');
    data.value.searchResults = response.data.data;
    console.log(data.value.searchResults)
  } catch (error) {
    console.error('Error fetching search results:', error);
    data.value.searchResults = []; // 清空搜索结果以显示错误信息
  }
}
</script>

<style scoped>

</style>