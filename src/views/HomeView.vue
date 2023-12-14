<template>
  <main>
    <div class="w-full h-full">
      <div class="flex justify-between flex-row-reverse py-10 px-10">
        <input
          type="checkbox"
          role="switch"
          class="toggle-theme"
          id="toggle-theme"
          v-model="negatedDarkMode"
        />
        <p>
          {{ formattedTime }}
        </p>
      </div>
    </div>
    <div class="flex justify-center items-center flex-col">
      <div class="nes-container with-title w-[800px]" :class="darkMode ? 'is-dark' : ''">
        <span class="title !text-4xl !mt-[-55px]">음식 추천 봇</span>
        <p class="mt-5">환영합니다. 좋은 {{ wordVariable }}입니다.</p>
        <p>저에게 오세요.</p>
        <p>음식 추천을 해드리겠습니다.</p>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, onBeforeMount, computed, watch, onMounted } from 'vue'
import { useDateFormat, useNow, useTimestamp } from '@vueuse/core'
const darkMode = ref(true)
const todayMidnight = ref(new Date())
const formattedTime = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
const now = useTimestamp()
const nowHMS = ref(now.value - todayMidnight.value.setHours(0, 0, 0, 0))

const updateWordVariable = () => {
  if (nowHMS.value > 0 && nowHMS.value <= 7200000) {
    // 0~3
    return '밤'
  } else if (nowHMS.value > 7200000 && nowHMS.value <= 21600000) {
    // 3~6
    return '새벽'
  } else if (nowHMS.value > 21600000 && nowHMS.value <= 43200000) {
    // 6~12
    return '아침'
  } else if (nowHMS.value > 43200000 && nowHMS.value <= 64800000) {
    // 12~18
    return '낮'
  } else if (nowHMS.value > 64800000 && nowHMS.value <= 75600000) {
    // 18~21
    return '저녁'
  } else if (nowHMS.value > 75600000 && nowHMS.value <= 86400000) {
    // 21~0
    return '밤'
  } else {
    return '날'
  }
}

const wordVariable = ref(updateWordVariable())

watch(now, () => {
  nowHMS.value = now.value - todayMidnight.value.setHours(0, 0, 0, 0)
  updateWordVariable()
})

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
