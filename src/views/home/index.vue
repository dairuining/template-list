<template>
  <div class="home" @click="handleCount">{{ count }}</div>
  <!-- 自定义组件 -->
  <a-button></a-button>
  <!-- iconify 图标 -->
  <icon-twemoji-bento-box />
  <icon-ep-close />
  <!-- 自定义svg -->
  <icon-custom-emoji-boy />
</template>

<script setup>
const count = ref(0);
const handleCount = () => {
  count.value++;
};
</script>

<style lang="less" scoped>
.home {
  color: red;
}
</style>
