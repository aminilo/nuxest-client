<script setup lang="ts">
const props = defineProps<{
  label: string
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<template>
  <div class="setting-item">
    <label class="setting-label">{{ label }}</label>
    <input type="checkbox" v-model="value" />
  </div>
</template>

<style scoped>
.setting-item { @apply flex items-center justify-between border-b border-dark-two dark:border-light-two py-4; }

.setting-label { @apply font-medium; }
</style>
