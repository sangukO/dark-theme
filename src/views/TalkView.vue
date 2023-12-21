<template>
  <div>
    <transition name="fade">
      <div
        v-if="move"
        class="absolute !bg-[var(--main-color)] h-[100vh] w-[100vw] z-[10000] top-0 left-0"
      ></div>
    </transition>
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
  console.log(history.state);
  move.value = history.state.move;
});
onMounted(async () => {
  move.value = false;
});
</script>

<style lang="postcss" scoped>
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-leave-from {
  opacity: 0;
}
</style>
