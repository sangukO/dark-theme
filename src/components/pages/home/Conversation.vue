<template>
  <div class="nes-container with-title w-[80%] max-w-[520px]" :class="darkMode ? 'is-dark' : ''">
    <span class="title !text-4xl !mt-[-3rem]">봇</span>
    <p class="mt-5">{{ sentence1 }}</p>
    <p class="sentence2">{{ sentence2 }}</p>
    <p class="sentence3">{{ sentence3 }}</p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
