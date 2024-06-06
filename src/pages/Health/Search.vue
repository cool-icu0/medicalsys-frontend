<template>
  <div>
    <van-search
        v-model="data.medicine"
        show-action
        placeholder="搜一搜疾病/药品/医院/疫苗"
        @search="onSearch"
        shape="round"
        @cancel="onCancel"
    >
    </van-search>

    <div v-if="data.searchResults!=''">
      <h2>搜索结果：</h2>
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
  </div>
</template>

<script setup>
import MyAxios from "../../config/myAxios.js";
import {ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter();
const data = ref({
  medicine: '', // 输入的药名
  searchResults: [], // 搜索结果
})
const onSearch =async () => {
      try {
        const response = await MyAxios.get(`/api/v1/medicine/selectMedicineByName/${data.value.medicine}`);
        data.value.searchResults = [response.data.data];
        console.log(data.value.searchResults)
      } catch (error) {
        console.error('Error fetching search results:', error);
        data.value.searchResults = []; // 清空搜索结果以显示错误信息
      }
}
const onCancel = async ()=>{
  router.back()
}
</script>
