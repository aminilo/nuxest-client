<script setup lang="ts">
defineProps({
  to: {
    type: [String, Object],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  showLeftIcon: {
    type: Boolean,
    default: false
  },
  showRightIcon: {
    type: Boolean,
    default: false
  },
  leftIcon: {
    type: String,
    default: 'mdi-light:chevron-double-left'
  },
  rightIcon: {
    type: String,
    default: 'mdi-light:chevron-double-right'
  }
});
</script>

<template>
  <div class="redirect-box">
    <NuxtLink :to="to" class="sth-link">
      <Icon 
        v-if="showLeftIcon" 
        :name="leftIcon" 
        class="l-arrow" 
      />
      <span>{{ text }}</span>
      <Icon 
        v-if="showRightIcon" 
        :name="rightIcon" 
        class="r-arrow" 
      />
    </NuxtLink>
  </div>
</template>

<style scoped>
.redirect-box { @apply inline-block m-4 select-none; }

.sth-link { @apply flex items-center font-bold border-b-2 border-light-two dark:border-dark-two rounded-full px-2; }

.l-arrow, .r-arrow { @apply h-9 w-9 translate-x-1 transition; }

.r-arrow { @apply -translate-x-1; }

.sth-link:hover .l-arrow { @apply -translate-x-1; }

.sth-link:hover .r-arrow { @apply translate-x-1; }
</style>
