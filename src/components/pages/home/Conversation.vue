<template>
  <div
    class="nes-container with-title w-[80%] max-w-[1000px] min-h-[148px]"
    :class="isDarkMode ? 'is-dark' : ''"
  >
    <span class="title !text-[3.2rem] !mt-[-4rem]">음식 추천 봇</span>
    <!-- <p class="s1">{{ s1 }}</p>
    <p class="s2">{{ s2 }}</p>
    <p class="s3">{{ s3 }}</p> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  s1: String,
  s2: String,
  s3: String,
  isDarkMode: Boolean
})

const strArr = ref(['123', '456', '789'])
</script>

<style lang="postcss" scoped></style>
