<template>
 <div id="test">
   <van-button @click="test">提示</van-button>
 </div>
</template>
<script setup lang="ts">
import {showSuccessToast, showToast} from 'vant';


const test=()=>{
  showSuccessToast({
    message:'成功文案',
    position: 'top',
  });
  // showToast('提示内容');
}
</script>
<style scoped>
#test {
}
</style>