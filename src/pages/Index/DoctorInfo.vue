<template>
  <div class="doctor-list">
    <!-- 展示医生列表 -->
    <div v-if="doctors.length" class="doctor-card-container">
      <div v-for="doctor in doctors" :key="doctor.id" class="doctor-card">
        <h3 class="doctor-name">{{ doctor.doctorName }}</h3>
        <p><strong>专业:</strong> {{ doctor.specialty }}</p>
        <p><strong>所属医院:</strong> {{ doctor.hospitalName }}</p>
        <p><strong>科室:</strong> {{ doctor.department }}</p>
        <p><strong>职位:</strong> {{ doctor.position }}</p>
        <p><strong>经验年数:</strong> {{ doctor.experienceYears }}</p>
        <!-- 角色信息可以根据实际业务逻辑进一步展示 -->
        <p v-if="doctor.isDelete === 0"><strong>状态:</strong> 在岗</p>
        <p v-else><strong>状态:</strong> 已离职</p>
      </div>

      <div v-for="doctor in doctors" :key="doctor.id" class="doctor-card">
        <p><strong>个人简介:</strong> {{ doctor.introduction }}</p>
      </div>
    </div>
    <!-- 没有医生信息时的提示 -->
    <p v-else class="no-doctors">没有找到医生信息。</p>
  </div>

  <!-- 按钮容器 -->
  <div class="button-container">
    <van-button type="primary" @click="goToPayment">确定医生</van-button>
    <!--<van-button type="default" @click="reselectDoctor">重新选择</van-button>-->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MyAxios from '../../config/myAxios'; // 确保引入了自定义的Axios实例

const router = useRouter();
const tags = ref(null);
const doctors = ref([]); // 用于存储医生列表

onMounted(() => {
  // 获取查询参数中的'tags'
  tags.value = router.currentRoute.value.query.tags;
  console.log(tags.value); // 打印tags的值，例如 '小李'

  // 假设tags是医生的姓名，用于查询医生信息
  if (tags.value) {
    getDoctorsByDepartmentName(tags.value);
  }
});

const getDoctorsByDepartmentName = async (name) => {
  try {
    const response = await MyAxios.get(`/api/v1/doctor/selectDepartmentByDepartmentName/${name}`);
    // 假设API返回的数据是一个包含医生信息的数组
    doctors.value = response.data.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
};
/**
 * 进入付款流程
 * @returns {{}}
 */
const goToPayment = ()=>({

})
const reselectDoctor = ()=>{
  router.push({
    path: '/index/feature'
  });
}
</script>

<style scoped>
.doctor-list {
  display: flex;
  flex-direction: column;
  align-items: center; /* 垂直居中所有子元素 */
}

.doctor-card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 水平居中所有卡片 */
  gap: 20px;
}

.doctor-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  width: calc(100% - 40px); /* 根据父容器宽度自适应 */
  max-width: 300px; /* 最大宽度限制 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; /* 每个卡片下边距 */
}

.doctor-card h3 {
  margin-top: 0;
}

.doctor-card p {
  margin: 5px 0;
}

.no-doctors {
  text-align: center;
  width: 100%;
  padding: 20px;
  color: #666;
}
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button-container .van-button {
  margin: 0 10px; /* 按钮之间的间距 */
}
</style>