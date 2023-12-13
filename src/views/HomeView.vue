<template>
  <main>
    <div class="w-full h-full bg-inherit" :class="darkMode ? 'bg-[#212529]' : 'bg-white'">
      <div class="flex-row-reverse py-10 px-10 flex">
        <input
          type="checkbox"
          role="switch"
          class="toggle-theme"
          id="toggle-theme"
          v-model="negatedDarkMode"
        />
      </div>
    </div>
    <div
      class="flex justify-center items-center flex-col"
      :class="darkMode ? 'bg-[#212529]' : 'bg-white'"
    >
      <div class="nes-container with-title" :class="darkMode ? 'is-dark' : ''">
        <p class="title">Container.is-dark</p>
        <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
        <p>환영합니다. 좋은 아침입니다.</p>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, onBeforeMount, computed, watch } from 'vue'
const darkMode = ref(true)

const negatedDarkMode = computed({
  get: () => !darkMode.value,
  set: (value) => {
    darkMode.value = !value
    savePreference(darkMode.value)
    document.documentElement.setAttribute('color-theme', darkMode.value ? 'dark' : 'light')
  }
})

const getInitialTheme = () => {
  if (localStorage.getItem('isDarkMode') === 'false') {
    return false
  }
  return true
}

const savePreference = (isDarkMode) => {
  localStorage.setItem('isDarkMode', isDarkMode)
}

onBeforeMount(() => {
  darkMode.value = getInitialTheme()
  document.documentElement.setAttribute('color-theme', darkMode.value ? 'dark' : 'light')
})
</script>
