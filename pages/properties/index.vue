<script setup lang="ts">
import { getAllProperties } from '~/services/propertyService';
import '@vueform/slider/themes/default.css';
import Slider from '@vueform/slider';

const sortBy = ref<'price-asc' | 'price-desc' | 'title-asc'>('price-asc');
const priceRange = ref<[number, number]>([0, 2000000]);
const minPrice = ref(priceRange.value[0]);
const maxPrice = ref(priceRange.value[1]);
const citySearch = ref('');
const visibleCount = ref(8);
const loadStep = 8;

watch(priceRange, ([min, max])=> {
  minPrice.value = min;
  maxPrice.value = max;
});

const { data: allProperties, pending: loading, error } = await useAsyncData('properties', ()=> getAllProperties().then(res=> res.data));

const filtered = computed(()=>
  allProperties.value?.filter(p=>
      p.price >= minPrice.value &&
      p.price <= maxPrice.value &&
      p.address?.toLowerCase().includes(citySearch.value.toLowerCase())
  ) || []
);

const sorted = computed(()=> {
  return [...filtered.value].sort((a, b)=> {
    if(sortBy.value === 'price-asc') return a.price - b.price;
    if(sortBy.value === 'price-desc') return b.price - a.price;
    if(sortBy.value === 'title-asc') return a.title.localeCompare(b.title);
    return 0;
  });
});

const visibleProperties = computed(()=> sorted.value.slice(0, visibleCount.value));

const loadMore = ()=> visibleCount.value += loadStep;

useHead({
  title: 'Property Listings',
  meta: [
    { name: 'description', content: 'Browse all available property listings on NuxEst. Find homes, apartments, and real estate across Iran.' },
    { name: 'keywords', content: 'real estate, properties, buy home, rent, listings, apartments, Iran properties' },
    { property: 'og:title', content: 'Property Listings | NuxEst' },
    { property: 'og:description', content: 'Explore verified property listings and find your perfect place on NuxEst.' },
    { property: 'og:type', content: 'website' }
    // { property: 'og:image', content: '/default-og-image.jpg' }, /* Ideally an image hosted in /public */
  ]
});
</script>

<template>
  <div class="property-list-page">
    <DynamicLink to="/" text="Go Back" :showLeftIcon="true" />

    <div class="filter-card">
      <div class="space-y-4">
        
        <div class="filter-group w-full">
          <label class="filter-label">Price Range</label>
          <Slider
            v-model="priceRange"
            :min="0"
            :max="2000000"
            :step="100000"
            :tooltip="true"
            :lazy="true"
            class="w-full"
          />
        </div>

        <div class="filter-controls">
          <div class="filter-group flex-1">
            <label class="filter-label">Sort By</label>
            <select v-model="sortBy" class="price-select">
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title-asc">Title A-Z</option>
            </select>
          </div>

          <div class="filter-group flex-1">
            <label class="filter-label">Search by City</label>
            <input
              v-model="citySearch"
              type="text"
              placeholder="e.g. Tehran, Shiraz, etc."
              class="city-input"
            />
          </div>
        </div>

      </div>
    </div>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Failed to load data.</div>

    <div v-else>
      <div class="property-grid">
        <NuxtLink v-for="property in visibleProperties" :key="property.id" :to="`/properties/${property.slug}`" class="property-card">
          <PropertyCard :property="property" />
        </NuxtLink>
      </div>

      <div class="text-center mt-8">
        <button v-if="visibleCount < sorted.length" @click="loadMore" class="loadmore">Load More</button>
      </div>
    </div>

    <DynamicLink to="/" text="Go Back" :showLeftIcon="true" />
  </div>
</template>

<style scoped>
.property-list-page { @apply space-y-4 p-2 relative min-h-[90vh]; }

.filter-card { @apply w-full md:w-2/3 mx-auto mb-6 z-50 bg-light-soft dark:bg-dark-soft shadow p-4 border-b-2 border-light-two dark:border-dark-two rounded-xl; }

.filter-header { @apply flex items-center justify-between mb-4; }

.filter-label { @apply mb-2 text-center; }

.filter-group { @apply flex flex-col; }

.filter-controls { @apply flex flex-col sm:flex-row gap-4 mt-2; }

.price-select, .city-input { @apply w-full p-2 rounded border border-light-two dark:border-dark-two bg-dark-two dark:bg-light-two transition duration-150 ease-in-out focus:outline-none  focus:bg-dark-one dark:focus:bg-light-one cursor-pointer; }

.property-grid { @apply max-w-7xl container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 text-center; }

.property-card { @apply bg-light-soft dark:bg-dark-soft rounded-lg shadow hover:shadow-lg hover:scale-[1.02] transition overflow-hidden; }

.property-img { @apply w-full h-48 object-cover; }

.card-body { @apply p-4 space-y-1; }

.card-title { @apply text-lg font-bold; }

.card-address { @apply text-sm text-light-two dark:text-dark-two; }

.card-price { @apply text-green-600 dark:text-green-400 font-semibold; }

.loadmore { @apply px-6 py-2 font-bold bg-dark-two dark:bg-light-two border-b-4 border border-light-two dark:border-dark-two hover:border-amber-500 dark:hover:border-amber-500 rounded transition; }
</style>
