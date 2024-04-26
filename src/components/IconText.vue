<template>
  <div>
    <van-empty
        :image="url"
        image-size="200"
        :description="desc"
    >
      <van-button round type="primary" class="bottom-button" @click="onClickBack">返回</van-button>
    </van-empty>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter();
const onClickBack = () => {
  router.back();
};
const props = defineProps({
  url: {type: String, required: true},
  desc: {type: String, default: "暂未适配"},
})
</script>

<style scoped>
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>