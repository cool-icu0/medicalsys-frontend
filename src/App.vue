<script setup>
import BasicLayouts from "./layout/BasicLayout.vue";
</script>

<template>
  <BasicLayouts/>
</template>

<style>
div /deep/ .van-cell:after {

  border: none;

}

[class*="van-hairline"]::after {

  border: none;

}
</style>
