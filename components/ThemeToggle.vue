<script setup>
const colorMode = useColorMode();
const toggleTheme = ()=> colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
const currentTheme = computed(()=>
  colorMode.value === 'dark' ? 'line-md:light-dark-loop' : 'line-md:light-dark-loop'
);
watch(() => colorMode.preference, (val) => {
  console.log('Theme changed to:', val);
});
</script>

<template>
  <ClientOnly fallback-tag="toggleBtn" fallback="ToggleBtn...">
    <button @click="toggleTheme" :title="colorMode.value === 'dark' ? 'Light' : 'Dark'" class="toggle-button">
      <Icon :name="currentTheme" class="text-2xl" />
    </button>
  </ClientOnly>
</template>

<style scoped>
.toggle-button { @apply border border-dark-two dark:border-light-two rounded-full hover:bg-dark-two dark:hover:bg-dark-bg px-2 py-1 cursor-pointer; }
</style>
