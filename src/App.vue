<template>
  <main class="w-[100%] h-[100%] relative">
    <div class="flex justify-between py-10 px-10">
      <p class="flex items-center mb-0 !text-3xl">
        {{ formattedTime }}
      </p>
      <input
        type="checkbox"
        role="switch"
        class="toggle-theme nes-pointer"
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
    <RouterView class="drag-prevent" :isDarkMode="darkMode" />
  </main>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref, onBeforeMount, computed } from 'vue';
import { useDateFormat, useNow } from '@vueuse/core';
const darkMode = ref(true);
const formattedTime = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss');

const negatedDarkMode = computed({
  get: () => !darkMode.value,
  set: (value) => {
    darkMode.value = !value;
    savePreference(darkMode.value);
    document.documentElement.setAttribute('color-theme', darkMode.value ? 'dark' : 'light');
  }
});

function getInitialTheme() {
  if (localStorage.getItem('isDarkMode') === 'false') {
    return false;
  }
  return true;
}

function savePreference(isDarkMode) {
  localStorage.setItem('isDarkMode', isDarkMode);
}

onBeforeMount(() => {
  darkMode.value = getInitialTheme();
  document.documentElement.setAttribute('color-theme', darkMode.value ? 'dark' : 'light');
});
</script>

<style scoped></style>
