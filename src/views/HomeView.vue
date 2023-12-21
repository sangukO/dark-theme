<template>
  <div>
    <transition name="fade">
      <div
        v-if="move"
        class="absolute !bg-[var(--main-color)] h-[100vh] w-[100vw] z-[10000] top-0 left-0"
      ></div>
    </transition>
    <div class="flex justify-center items-center flex-col h-[calc(100vh-145px)]">
      <div
        class="nes-container with-title w-[82%] max-w-[1000px] min-h-[175px]"
        :class="props.isDarkMode ? 'is-dark' : ''"
      >
        <span class="title !text-[3.2rem] !mt-[-4rem]">음식 추천 봇</span>
        <div class="sentenceDiv">
          <p ref="sRef" class="sentence" :class="props.isDarkMode"></p>
          <span
            v-if="isLoaded && !isSkip"
            class="absolute right-8 bottom-5 skipText px-2 nes-pointer"
            @click="isSkip = true"
            >스킵</span
          >
        </div>
      </div>
      <div class="pt-8 h-[50px]">
        <transition name="pick">
          <div v-if="progress == 1 && picked === ''" class="flex gap-x-20">
            <label>
              <input
                type="radio"
                class="nes-radio"
                :class="props.isDarkMode ? 'is-dark' : ''"
                name="answer-dark"
                value="Y"
                v-model="picked"
                :disabled="picked != ''"
                @click="pickAnswer('Y')"
              />
              <span>좋아</span>
            </label>
            <label>
              <input
                type="radio"
                class="nes-radio"
                :class="props.isDarkMode ? 'is-dark' : ''"
                name="answer-dark"
                value="N"
                v-model="picked"
                :disabled="picked != ''"
                @click="pickAnswer('N')"
              />
              <span>싫어</span>
            </label>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { ref, computed, onMounted, watch } from 'vue';
import { useTimestamp } from '@vueuse/core';
const props = defineProps({
  isDarkMode: {
    Type: Boolean,
    required: true
  }
});
const todayMidnight = ref(new Date());
const now = useTimestamp();
const nowHMS = computed(() => now.value - todayMidnight.value.setHours(0, 0, 0, 0));
const picked = ref('');
const progress = ref(0);
const sRef = ref(null);
const router = useRouter();
const move = ref(false);
const isLoaded = ref(false);
const isSkip = ref(false);
const wordVariable = computed(() => {
  const cloneNowHMS = nowHMS.value;
  if (cloneNowHMS > 0 && cloneNowHMS <= 25200000) {
    // 0~7
    return { time: '새벽', food: '야식' };
  } else if (cloneNowHMS > 25200000 && cloneNowHMS <= 43200000) {
    // 7~12
    return { time: '아침', food: '아침 식사' };
  } else if (cloneNowHMS > 43200000 && cloneNowHMS <= 50400000) {
    // 12~14
    return { time: '낮', food: '점심 식사' };
  } else if (cloneNowHMS > 50400000 && cloneNowHMS <= 61200000) {
    // 14~17
    return { time: '오후', food: '간식' };
  } else if (cloneNowHMS > 61200000 && cloneNowHMS <= 72670000) {
    // 17~21
    return { time: '저녁', food: '저녁 식사' };
  } else if (cloneNowHMS > 75600000 && cloneNowHMS <= 86400000) {
    // 21~0
    return { time: '밤', food: '야식' };
  } else {
    return { time: '날', food: '음식' };
  }
});
// const initQ = `${wordVariable.value.time}에 먹을 ${wordVariable.value.food}에 대해 추천해줘`

const sentenceText = computed({
  get() {
    if (progress.value === 0 || progress.value === 1) {
      return `안녕하세요. 좋은 ${wordVariable.value.time}입니다.
        메뉴가 고민될 땐 저에게 오세요.
        ${wordVariable.value.food} 추천을 해드리겠습니다.`;
    } else if (progress.value === 2) {
      return `그럼 진행하겠습니다.
        저를 따라오세요.
        발 밑을 조심하세요.`;
    } else if (progress.value === 3) {
      return `알겠습니다.
        음식 추천 봇이었습니다.
        다음에 다시 찾아주세요.`;
    }
  },
  set() {}
});

async function skip() {
  sRef.value.textContent = sentenceText.value;
  await delay(1000);
  sRef.value.classList.add('done');
}

async function typeText(sentenceRef, sentence) {
  if (sentence === '') {
    sentenceRef.value.textContent = '';
    sentenceRef.value.classList.remove('done');
    return;
  }

  const text = ref('');
  sentenceRef.value.classList.add('blink');

  return new Promise((resolve, reject) => {
    for (let i = 0; i < sentence.length; i++) {
      setTimeout(() => {
        if (!isSkip.value) {
          text.value += sentence[i];
          sentenceRef.value.textContent = text.value;
          if (i === sentence.length - 1) {
            setTimeout(() => {
              sentenceRef.value.classList.add('done');
              resolve();
            }, 1000);
          }
        } else {
          skip();
          reject('123');
        }
      }, 120 * i);
    }
  });
}

async function executeTypeText() {
  await typeText(sRef, sentenceText.value, false);
}

async function deleteText() {
  typeText(sRef, '', true);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function pickAnswer(value) {
  picked.value = value;
  await deleteText();
  if (picked.value === 'Y') {
    progress.value = 2;
    await executeTypeText();
    move.value = true;
    await delay(2000);
    router.push({
      name: 'talk',
      state: {
        move: true
      }
    });
  } else {
    progress.value = 3;
    await executeTypeText();
  }
}

onMounted(async () => {
  await delay(1000);
  isLoaded.value = true;
  try {
    await executeTypeText();
  } catch (e) {
    progress.value = 1;
  }
});
</script>
<style lang="postcss" scoped>
.pick-leave-active {
  transition-delay: 1500ms;
}
.fade-enter-active {
  transition: opacity 2s ease;
}

.fade-enter-from {
  opacity: 0;
}
</style>
