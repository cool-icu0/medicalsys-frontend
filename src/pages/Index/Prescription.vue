<template>
  <div class="form-container">
    <van-form @submit="onSubmit">
      <van-cell title="填写案例" value="感冒灵x1" />
      <van-field
          v-model="username"
          label="患者名字"
          placeholder="请输入名字"
      />
      <van-field
          v-model="form.medicationGuide"
          rows="1"
          autosize
          label="用药指南"
          type="textarea"
          maxlength="50"
          placeholder="请输入用药指南"
          show-word-limit
      />
      <div class="submit-button">
        <van-button round block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";

const route = useRoute()
const form = ref({
  createTime:'',
  id:0,
  medicationGuide: '',
  status:null,
  userId:0 ,
});
const username=ref('');
onMounted(()=>{
  form.value.userId = route.query.id
  username.value = route.query.username
})
import {onMounted, ref} from "vue";
import myAxios from "../../config/myAxios.js";
// import 'vant/lib/index.css'
import {showToast} from "vant";
const onSubmit = async (event) => {
  showToast({
    message:'成功文案1',

  })
  // 处理表单提交逻辑
  // console.log('Form submitted:', form.value);
  // const res = await myAxios.post("/api/v1/prescription/insertPrescription",form.value)
  // if (res.data.code===200){
  //   router.push("/message")
  // }

  // 阻止表单默认提交行为
  event.preventDefault();
}
</script>

<style>
.form-container {
  padding: 16px;
}

.submit-button {
  margin-top: 20px;
}
</style>


