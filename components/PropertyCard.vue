<script setup lang="ts">
import type { Property } from '~/types';

defineProps<{ property: Property }>();

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
function imageUrl(filename?: string) {
  return filename ? `${apiBaseUrl}${filename}` : '/placeholder.jpg';
}
</script>

<template>
  <div class="card">
    <img :src="imageUrl(property.image)" alt="Property image" class="card-image" />
    <div class="card-body">
      <h2 class="card-title">{{ property.title }}</h2>
      <p class="card-price">
        <Icon name="mdi-light:cart" class="w-6 h-6" />
        <span>${{ property.price.toLocaleString() }}</span>
      </p>
      <p class="card-location">
        <Icon name="mdi-light:map-marker" class="w-6 h-6" />
        <span>{{ property.address }}</span>
      </p>
      <div class="card-stats">
        <span title="bedroom">{{ property.beds }} 🛏️</span>
        <span title="bathroom">{{ property.baths }} 🛁</span>
        <span title="square foot">{{ property.sqft }} sqft</span>
      </div>
    </div>
  </div>
</template>


<style scoped>
.card { @apply w-full max-w-[85vw] sm:max-w-none select-none border border-zinc-200 dark:border-zinc-800 bg-light-soft dark:bg-dark-soft rounded-lg overflow-hidden transition; }

.card-image { @apply w-full h-44 sm:h-56 md:h-72 object-cover; }

.card-body { @apply p-2 space-y-1 text-sm md:text-base; }

.card-title { @apply font-bold; }

.card-location { @apply text-light-two dark:text-dark-two; }

.card-price { @apply text-light-one dark:text-dark-one; }

.card-stats { @apply flex justify-around text-light-two dark:text-dark-two text-lg; }

.card-stats span { @apply border-b-2 border-t-2 border-dark-two dark:border-dark-bg hover:bg-dark-two dark:hover:bg-dark-bg rounded p-1 mt-1; }
</style>
