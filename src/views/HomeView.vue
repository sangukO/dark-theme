<template>
  <main class="w-[100%] h-[100%] relative">
    <div class="flex justify-between py-10 px-10">
      <p class="flex items-center mb-0 !text-3xl">
        {{ formattedTime }}
      </p>
      <input
        type="checkbox"
        role="switch"
        class="toggle-theme"
        id="toggle-theme"
        v-model="negatedDarkMode"
      />
    </div>
    <div class="images absolute top-[100px]">
      <img src="@assets/image/Chars.svg" class="w-[calc(40vw+5px)] max-w-[250px]" />
    </div>
    <div class="images absolute bottom-0 right-0">
      <img src="@assets/image/Chars1.svg" class="w-[calc(40vw+5px)] max-w-[250px]" />
    </div>
    <div class="flex justify-center items-center flex-col h-[calc(100vh-145px)]">
      <div
        class="nes-container with-title w-[80%] max-w-[1000px] min-h-[148px]"
        :class="darkMode ? 'is-dark' : ''"
      >
        <span class="title !text-[3.2rem] !mt-[-4rem]">음식 추천 봇</span>
        <p><span ref="s1Ref" class="s1" :class="darkMode"></span></p>
        <p><span ref="s2Ref" class="s2" :class="darkMode"></span></p>
        <p><span ref="s3Ref" class="s3" :class="darkMode"></span></p>
      </div>
      <div class="pt-8 h-[50px]">
        <transition name="pick">
          <div v-if="picked === ''" class="flex gap-x-20">
            <label>
              <input
                type="radio"
                class="nes-radio"
                :class="darkMode ? 'is-dark' : ''"
                name="answer-dark"
                value="Y"
                v-model="picked"
                :disabled="picked != ''"
                @click="progress++"
              />
              <span>좋아</span>
            </label>
            <label>
              <input
                type="radio"
                class="nes-radio"
                :class="darkMode ? 'is-dark' : ''"
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
    </div>
  </main>
</template>
<script setup>
import { ref, onBeforeMount, computed, watch, nextTick, onMounted } from 'vue'
import { useDateFormat, useNow, useTimestamp } from '@vueuse/core'
// import Conversation from '@components/pages/home/Conversation.vue'
// import { progress, increment } from '@stores/status.js'
const darkMode = ref(true)
const todayMidnight = ref(new Date())
const formattedTime = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
const now = useTimestamp()
const nowHMS = computed(() => now.value - todayMidnight.value.setHours(0, 0, 0, 0))
const picked = ref('')
const progress = ref(0)
const s1Ref = ref(null)
const s2Ref = ref(null)
const s3Ref = ref(null)
const wordVariable = computed(() => {
  const cloneNowHMS = nowHMS.value
  if (cloneNowHMS > 0 && cloneNowHMS <= 25200000) {
    // 0~7
    return { time: '새벽', food: '야식' }
  } else if (cloneNowHMS > 25200000 && cloneNowHMS <= 43200000) {
    // 7~12
    return { time: '아침', food: '아침 식사' }
  } else if (cloneNowHMS > 43200000 && cloneNowHMS <= 50400000) {
    // 12~14
    return { time: '낮', food: '점심 식사' }
  } else if (cloneNowHMS > 50400000 && cloneNowHMS <= 61200000) {
    // 14~17
    return { time: '오후', food: '간식' }
  } else if (cloneNowHMS > 61200000 && cloneNowHMS <= 72670000) {
    // 17~21
    return { time: '저녁', food: '저녁 식사' }
  } else if (cloneNowHMS > 75600000 && cloneNowHMS <= 86400000) {
    // 21~0
    return { time: '밤', food: '야식' }
  } else {
    return { time: '날', food: '음식' }
  }
})

watch(picked, async (to) => {
  await nextTick()
  sentence1.value = '감사합니다.'
})

const sentence1 = computed({
  get() {
    if (progress.value === 0) {
      return `안녕하세요. 좋은 ${wordVariable.value.time}입니다.`
    } else if (progress.value === 1) {
      return `감사합니다.`
    }
  },
  set() {}
})

const sentence2 = computed({
  get() {
    if (progress.value === 0) {
      return `저에게 오세요.`
    } else if (progress.value === 1) {
      return `그럼 진행하겠습니다.`
    }
  },
  set() {}
})

const sentence3 = computed({
  get() {
    if (progress.value === 0) {
      return `${wordVariable.value.food} 추천을 해드리겠습니다.`
    } else if (progress.value === 1) {
      return `다음 질문을 드리겠습니다.`
    }
  },
  set() {}
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

async function typeText(sentenceRef, sentence) {
  const text = ref('')
  sentenceRef.value.classList.add('blink')
  return new Promise((resolve) => {
    for (let i = 0; i < sentence.length; i++) {
      setTimeout(() => {
        text.value += sentence[i]
        sentenceRef.value.textContent = text.value
        if (i === sentence.length - 1) {
          setTimeout(() => {
            sentenceRef.value.classList.add('done')
            resolve()
          }, 1000)
        }
      }, 100 * i)
    }
  })
}

async function executeTypeText() {
  await delay(500)
  await typeText(s1Ref, sentence1.value)
  await typeText(s2Ref, sentence2.value)
  await typeText(s3Ref, sentence3.value)
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

onMounted(async () => {
  executeTypeText()
})

onBeforeMount(() => {
  darkMode.value = getInitialTheme()
  document.documentElement.setAttribute('color-theme', darkMode.value ? 'dark' : 'light')
})
</script>
<style lang="postcss" scoped>
.pick-leave-active {
  transition-delay: 1500ms;
}
.blink {
  animation: cursor 0.53s step-end infinite;
}

.done {
  border: none;
}
</style>
