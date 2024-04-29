<template>
  <!--背景-->
  <div class="login-container">
    <!--logo-->
    <div class="LoginLogo">
      <van-image
          width="10rem"
          height="10rem"
          fit="fill"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/logo.png"
      />
    </div>
    <!--设置slogan-->
    <div class="slogan">
      <div v-if="slogan">
        <h4>健康就是最大的幸福！</h4>
      </div>
      <div v-else-if="!slogan">
        <h4>幸福就是一直健健康康</h4>
      </div>
    </div>
    <!--登录块-->
    <van-row justify="center">
      <van-col span="3"></van-col>
      <van-col span="18">
        <van-form @submit="onSubmit" class="transparent-form">
          <van-cell-group inset>
            <van-field
                v-model="user.userAccount"
                name="userAccount"
                label="账号"
                label-align="top"
                placeholder="账号"
                :rules="[{ required: true, message: '请填写账号' }]"
            />
            <!--固定高度-->
            <!--<div style="height: 16px"></div>-->
            <van-field
                v-model="user.password"
                type="password"
                name="password"
                label="密码"
                label-align="top"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
          </van-cell-group>
          <div style="margin: 16px;">
            <van-button class="buttonColor" round block type="primary" native-type="submit">
              立即登录
            </van-button>
          </div>
          <!--选择注册-->
          <div class="RegisterText" @click="GoRegister">
            还没有账号？注册
          </div>
        </van-form>
      </van-col>
      <van-col span="3"></van-col>
    </van-row>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import {onMounted, ref} from "vue";
import { Toast } from "@vant/compat";
import myAxios from "../../config/myAxios.js";
const router = useRouter();

const user =ref({
  userAccount:'',
  password:''
})
const slogan=ref(true)

onMounted(()=>{
  setInterval(() => {
    slogan.value = !slogan.value;
  }, 2000)
})
//提交登录请求
import {useUserStore} from "../../config/store.js";
const userStore = useUserStore();
const onSubmit = async () => {
  console.log("user:",user.value)
  const res = await myAxios.post('/user/login',
    user.value,
  );
  if (res.data.code === 200 && res.data.data) {
    Toast.success('登录成功');
    userStore.login(user.value.userAccount);
    await router.replace('/user/main');
  } else {
    Toast.fail('登录失败');
  }
};
//提交注册请求
const GoRegister= async ()=>{
  await router.push('/user/register')
}
</script>

<style scoped>
.login-container{
  background-image: url("../../assets/color1.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: fixed; /* 充满全屏 */
  height: 100%;
  width: 100%;
}
.LoginLogo{
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  place-items: center;
}
.buttonColor{
}
.RegisterText{
  text-align: center;
}
.slogan{
  text-align: center;
}
/**根据CSS覆盖属性修改字体大写 */
/*:root:root {
  --van-field-1-label-font-weight: 900;
  --van-field-2-label-font-weight: 900;
}*/

</style>