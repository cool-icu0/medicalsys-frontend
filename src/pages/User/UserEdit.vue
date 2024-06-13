<template>
  <van-form @submit="onSubmit">
    <van-field
        v-model="editUser.currentValue"
        :name="editUser.editKey"
        :label="editUser.editName"
        :placeholder="`请输入${editUser.editName}`"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref, watch} from "vue";
import myAxios from "../../config/myAxios.js";
import {useUserStore} from "../../config/store.js";
import {showToast} from "vant";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const isLoggedIn = userStore.isLoggedIn;
const userAccount =userStore.userAccount;
const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})
const user =ref({
  userAccount:userAccount,
})
// 动态为 user 添加属性和值
if (editUser.value.editKey && editUser.value.currentValue) {
  user.value[editUser.value.editKey] = editUser.value.currentValue;
}
const onSubmit= async (values)=>{
  console.log('onSubmit',values)
  const res = await myAxios.post('/user/update',
      user.value,
  )
  console.log("修改后返回的值",res.data)
  if (res.data.code===200){
    showToast({
      message: '修改成功',
      icon: 'like-o',
    })
    await router.back()
  }
}
watch(
    () => editUser.value.currentValue,
    (newValue) => {
      user.value[editUser.value.editKey] = newValue;
    }
);
</script>

<style scoped>

</style>