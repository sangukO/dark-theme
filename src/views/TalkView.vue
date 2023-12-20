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
import { useRoute } from 'vue-router'
import { onBeforeMount, onMounted, ref } from 'vue'
const move = ref()
const route = useRoute()
onBeforeMount(() => {
  console.log(move.value)

  move.value = history.state.move
  console.log(move.value)
})
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
onMounted(async () => {
  console.log(move.value)

  await delay(2000)
  move.value = false
  console.log(move.value)
})
// const initQ = `${wordVariable.value.time}에 먹을 ${wordVariable.value.food}에 대해 추천해줘`
</script>

<style lang="postcss" scoped>
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-leave-from {
  opacity: 0;
}
</style>
