<template>
  <div
    class="nes-container with-title w-[80%] max-w-[1000px] min-h-[148px]"
    :class="isDarkMode ? 'is-dark' : ''"
  >
    <span class="title !text-[3.2rem] !mt-[-4rem]">봇</span>
    <p>{{ s1 }}</p>
    <p>{{ s2 }}</p>
    <p>{{ s3 }}</p>
  </div>
</template>

<script setup>
defineProps({
  s1: String,
  s2: String,
  s3: String,
  isDarkMode: Boolean
})
</script>

<style lang="scss" scoped></style>
