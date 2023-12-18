<template>
  <div
    class="nes-container with-title w-[80%] max-w-[1000px] min-h-[148px]"
    :class="isDarkMode ? 'is-dark' : ''"
  >
    <span class="title !text-[3.2rem] !mt-[-4rem]">음식 추천 봇</span>
    <!-- <vue-typed-js :strings="['First text', 'Second Text']">
      <p class="typing"></p>
    </vue-typed-js> -->
    <p class="s2">{{ s2 }}</p>
    <p class="s3">{{ s3 }}</p>
  </div>
</template>

<script setup>
defineProps({
  s1: String,
  s2: String,
  s3: String,
  isDarkMode: Boolean
})

// const typed = new Typed('#typed', {
//   strings: ['npm install^1000\n `installing components...` ^1000\n `Fetching from source...`'],
//   typeSpeed: 40,
//   backSpeed: 0,
//   loop: true
// })
</script>

<style lang="postcss" scoped></style>
