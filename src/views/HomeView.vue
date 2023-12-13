<template>
  <main>
    <div class="w-full h-full flex flex-row-reverse py-10 px-10">
      <input
        type="checkbox"
        role="switch"
        class="toggle-theme"
        id="toggle-theme"
        v-model="negatedDarkMode"
      />
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
