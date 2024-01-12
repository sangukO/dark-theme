<template>
  <div class="!bg-blue-500 !w-full !h-full flex justify-center items-center">
    <transition name="fade">
      <div
        v-if="move"
        class="absolute !bg-[var(--main-color)] h-[100vh] w-[100vw] z-[10000] top-0 left-0"
      ></div>
    </transition>
    <div class="flex w-[100px] h-[100px] !bg-red-500 z-50 justify-center items-center">hello</div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onBeforeMount, onMounted, ref } from 'vue';
const move = ref();
const route = useRoute();
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
onBeforeMount(async () => {
  move.value = history.state.move;
});
onMounted(async () => {
  move.value = false;
});
</script>

<style lang="postcss" scoped>
.fade-leave-active {
  transition-delay: 1500ms;
}

.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-leave-to {
  opacity: 0;
}
</style>
