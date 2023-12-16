<template>
  <main class="w-[100vw] h-[100vh]">
    <div class="flex justify-between flex-row-reverse py-10 px-10">
      <input
        type="checkbox"
        role="switch"
        class="toggle-theme"
        id="toggle-theme"
        v-model="negatedDarkMode"
      />
      <p class="flex items-center mb-0 !text-3xl">
        {{ formattedTime }}
        {{ nowHMS }}
      </p>
    </div>

    <div class="flex items-center flex-col h-[calc(100vh-145px)] pt-40">
      <div
        class="nes-container with-title w-[80%] max-w-[520px]"
        :class="darkMode ? 'is-dark' : ''"
      >
        <span class="title !text-4xl !mt-[-3rem]">봇</span>
        <p class="mt-5">{{ sentence1 }}</p>
        <p class="sentence2">{{ sentence2 }}</p>
        <p class="sentence3">{{ sentence3 }}</p>
      </div>
      <transition name="pick">
        <div v-if="picked === ''" class="pt-8 flex gap-x-20">
          <label>
            <input
              type="radio"
              class="nes-radio is-dark"
              name="answer-dark"
              value="Y"
              v-model="picked"
              :disabled="picked != ''"
            />
            <span>좋아</span>
          </label>
          <label>
            <input
              type="radio"
              class="nes-radio is-dark"
              name="answer-dark"
              value="N"
              v-model="picked"
              :disabled="picked != ''"
            />
            <span>싫어</span>
          </label>
        </div>
      </transition>
    </div>
  </main>
</template>
<script setup>
import { ref, onBeforeMount, computed, watch, onMounted, nextTick } from 'vue'
import { useDateFormat, useNow, useTimestamp } from '@vueuse/core'
const darkMode = ref(true)
const todayMidnight = ref(new Date())
const formattedTime = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
const now = useTimestamp()
const nowHMS = ref(now.value - todayMidnight.value.setHours(0, 0, 0, 0))
const picked = ref('')
const wordVariable = ref(updateWordVariable())

const sentence1 = ref(`안녕하세요 좋은 ${wordVariable.value.time}입니다.`)
const sentence2 = ref(`저에게 오세요.`)
const sentence3 = ref(`${wordVariable.value.food} 추천을 해드리겠습니다.`)

function updateWordVariable() {
  if (nowHMS.value > 0 && nowHMS.value <= 25200000) {
    // 0~7
    return { time: '새벽', food: '야식' }
  } else if (nowHMS.value > 25200000 && nowHMS.value <= 43200000) {
    // 7~12
    return { time: '아침', food: '아침 식사' }
  } else if (nowHMS.value > 43200000 && nowHMS.value <= 50400000) {
    // 12~14
    return { time: '낮', food: '점심 식사' }
  } else if (nowHMS.value > 50400000 && nowHMS.value <= 61200000) {
    // 14~17
    return { time: '오후', food: '간식' }
  } else if (nowHMS.value > 61200000 && nowHMS.value <= 75600000) {
    // 17~21
    return { time: '저녁', food: '저녁 식사' }
  } else if (nowHMS.value > 75600000 && nowHMS.value <= 86400000) {
    // 21~0
    return { time: '밤', food: '야식' }
  } else {
    return { time: '날', food: '음식' }
  }
}

watch(now, () => {
  nowHMS.value = now.value - todayMidnight.value.setHours(0, 0, 0, 0)
  updateWordVariable()
})

watch(picked, async (to) => {
  await nextTick()
  sentence1.value = '감사합니다.'
})

const negatedDarkMode = computed({
  get: () => !darkMode.value,
  set: (value) => {
    darkMode.value = !value
    savePreference(darkMode.value)
    document.documentElement.setAttribute('color-theme', darkMode.value ? 'dark' : 'light')
  }
})

function getInitialTheme() {
  if (localStorage.getItem('isDarkMode') === 'false') {
    return false
  }
  return true
}

function savePreference(isDarkMode) {
  localStorage.setItem('isDarkMode', isDarkMode)
}

onBeforeMount(() => {
  darkMode.value = getInitialTheme()
  document.documentElement.setAttribute('color-theme', darkMode.value ? 'dark' : 'light')
})
</script>
<style lang="postcss" scoped>
.pick-leave-active {
  transition-delay: 1500ms;
}
</style>
