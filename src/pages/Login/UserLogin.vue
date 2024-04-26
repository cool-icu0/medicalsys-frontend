<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="user.userAccount"
          name="userAccount"
          label="账号"
          placeholder="账号"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="user.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { Toast } from "@vant/compat";
import myAxios from "../../config/myAxios.js";
import qs from 'qs'
const router = useRouter();

const user =ref({
  userAccount:'',
  password:''
})

const onSubmit = async () => {
  console.log("user:",user.value)
  const res = await myAxios.post('/user/login',
    user.value,
  );
  console.log(res, '用户登录');
  console.log(res.data, '用户登录接口');
  if (res.data.code === 200 && res.data.data) {
    Toast.success('登录成功');
    router.replace('/');
  } else {
    Toast.fail('登录失败');
  }
};
</script>

<style scoped>
</style>