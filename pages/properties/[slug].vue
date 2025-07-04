<script setup lang="ts">
import { getPropertyBySlug } from '~/services/propertyService';

const route = useRoute();
const slug = route.params.slug as string;

const { data: property, pending, error } = await useAsyncData(`property-${slug}`, ()=>
  getPropertyBySlug(slug).then(res=> res.data)
);

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;
function imageUrl(filename?: string) {
  return filename ? `${apiBaseUrl}${filename}` : null;
}

onMounted(async ()=> {
  if(!property.value) return;
  const L = await import('leaflet');
  const map = L.map('property-map').setView([property.value.lat, property.value.lng], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);
  L.marker([property.value.lat, property.value.lng]).addTo(map);
});

useHead(() => ({
  title: property.value?.title || 'Property Details',
  meta: [
    { name: 'description', content: property.value?.description ?? 'Explore this property listing on NuxEst.' },
    { property: 'og:title', content: `${property.value?.title} | NuxEst` },
    { property: 'og:description', content: property.value?.description },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: property.value?.image ? `${apiBaseUrl}${property.value.image}` : '/default-og-image.jpg' }, /* Ideally an image hosted in /public */
  ]
}));
</script>

<template>
  <div>
    <DynamicLink to="/" text="Go Back" :showLeftIcon="true" />

    <div v-if="pending">Loading property...</div>
    <div v-else-if="error">Failed to load property.</div>

    <div v-else class="property-page space-y-6">
      <div class="hero">
        <img :src="imageUrl(property?.image) ?? 'default-property.jpg'" :alt="property?.title" class="hero-image" />
      </div>

      <div class="details">
        <div class="title-row">
          <div>
            <h1 class="title">{{ property?.title }}</h1>
            <p class="address">
              <Icon name="mdi-light:map-marker" class="w-6 h-6" />
              <span>{{ property?.address }}</span>
            </p>
          </div>

          <p class="property-price">
            <Icon name="mdi-light:cart" class="w-6 h-6" />
            <span>${{ property.price.toLocaleString() }}</span>
          </p>
        </div>

        <div class="badges">
          <span class="badge">🛏 {{ property?.beds }} Beds</span>
          <span class="badge">🛁 {{ property?.baths }} Baths</span>
          <span class="badge">📐 {{ property?.sqft.toLocaleString() }} sqft</span>
        </div>

        <div class="phone">
          <Icon name="material-symbols:call" class="phone-icon" />
          <span>{{ property?.phone ?? '+98-904-569-7984' }}</span>
        </div>

        <div class="description-box">
          <p class="description">{{ property?.description }}</p>
          <p class="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quidem nisi, doloremque expedita est quis!
          </p>
        </div>
      </div>

      <div id="property-map" class="map-box"></div>
    </div>

    <DynamicLink to="/" text="Go Back" :showLeftIcon="true" />
  </div>
</template>

<style scoped>
.property-page { @apply py-8; }

.hero-image { @apply w-full h-[50vh] rounded-lg shadow; }

.map-box { @apply w-full h-72 rounded shadow; }

.details { @apply space-y-4 p-4 bg-light-soft dark:bg-dark-soft rounded-lg shadow-md; }

.title-row { @apply px-6 py-2 border-b border-dark-two dark:border-light-two flex flex-col md:flex-row justify-between items-start md:items-center gap-2; }

.title { @apply text-2xl font-semibold tracking-tight text-light-two dark:text-dark-two; }

.property-price { @apply text-xl font-bold text-amber-600 dark:text-amber-400 underline underline-offset-4; }

.address { @apply text-sm italic text-light-two dark:text-dark-two; }

.badges { @apply flex flex-wrap gap-2; }

.badge { @apply bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 text-base font-bold px-3 py-1 rounded-full shadow; }

.phone { @apply flex items-center gap-2 text-lg text-light-two dark:text-dark-two mt-2; }

.phone-icon { @apply text-lg text-green-600 dark:text-green-400; }

.description-box { @apply space-y-2 text-lg lg:text-xl leading-relaxed text-light-two dark:text-dark-two border-t p-1 border-dark-two dark:border-light-two; }
</style>
