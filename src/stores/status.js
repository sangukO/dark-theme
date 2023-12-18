import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const status = defineStore('status', () => {
  const progress = ref(0)
  function increment() {
    progress.value++
  }

  return { progress, increment }
})
