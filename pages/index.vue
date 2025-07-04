<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import { getAllProperties } from '~/services/propertyService';

/* Party.js (client-side only) */
let party: any;
if(process.client) import('party-js').then(module=> party = module.default );

const { data: allProperties, pending: loading, error } = await useAsyncData('properties', ()=> getAllProperties().then(res => res.data));

const email = ref('');
const submitted = ref(false);

function handleSubscribe() {
  if(!email.value) return;

  /* Simulate success - couled be hooked up to a real API */
  submitted.value = true;

  if(process.client && party) party.confetti(document.querySelector('.newsletter-button') as HTMLElement, { count: 40, size: 1.1, spread: 35 });
  setTimeout(()=> { /* Reset form after delay */
    email.value = '';
    submitted.value = false;
  }, 3000);
}

useHead({
  title: 'NuxEst | Find Your Dream Property',
  meta: [
    { name: 'description', content: 'Browse verified real estate listings, explore properties, and find your dream home with NuxEst.' },
    { name: 'keywords', content: 'real estate, properties, buy house, rent property, verified listings, dream home' },
    { property: 'og:title', content: 'NuxEst | Find Your Dream Property' },
    { property: 'og:description', content: 'Explore verified property listings and find your perfect place.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://nuxest.onrender.com' },
    // { property: 'og:image', content: '/default-og-image.jpg' } /* Ideally an image hosted in /public */
  ]
});
</script>

<template>
  <div>
    <!-- HERO SECTION -->
    <section class="home-hero">
      <h1 class="hero-title">Find Your Dream Property</h1>
      <p class="hero-subtitle">Browse our latest real estate listings in your area.</p>
    </section>

    <!-- FEATURED SECTION -->
    <section class="featured-section">
      <h2 class="featured-title">Featured Properties</h2>
      <div class="swiper-container-wrapper">

        <Swiper :slides-per-view="'auto'" :space-between="16" free-mode grab-cursor class="property-swiper">
          <SwiperSlide v-for="property in allProperties" :key="property.id" class="max-w-[300px] sm:w-[300px] md:w-[340px] lg:w-[360px] min-w-0">
					  <NuxtLink :to="`/properties/${property.slug}`" class="block hover:shadow-xl transition-shadow duration-300 rounded-lg">
              <PropertyCard :property="property" />
            </NuxtLink>
					</SwiperSlide>
        </Swiper>

        <DynamicLink to="/properties" text="View Property List" :showLeftIcon="true" :showRightIcon="true" />
      </div>
    </section>

    <!-- VIDEO SECTION -->
    <section class="video-section">
      <h2 class="section-title">Explore How It Works</h2>
      <div class="video-wrapper">
        <iframe
          class="video-frame"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="How It Works"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </section>

    <!-- WHY CHOOSE US SECTION -->
    <section class="why-us-section">
      <h2 class="section-title">Why Choose NuxEst?</h2>
      <div class="benefits-grid">
        <div class="benefit-card">
          <Icon name="material-symbols:home" class="benefit-icon" />
          <h3 class="benefit-title">Verified Listings</h3>
          <p class="benefit-desc">All properties are reviewed and verified for authenticity.</p>
        </div>
        <div class="benefit-card">
          <Icon name="material-symbols:support-agent" class="benefit-icon" />
          <h3 class="benefit-title">24/7 Support</h3>
          <p class="benefit-desc">Our team is available anytime to assist with your journey.</p>
        </div>
        <div class="benefit-card">
          <Icon name="material-symbols:security" class="benefit-icon" />
          <h3 class="benefit-title">Secure Platform</h3>
          <p class="benefit-desc">Your data and transactions are protected by top security standards.</p>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER SECTION -->
    <section class="newsletter-section">
      <h2 class="section-title">Stay in the Loop</h2>
      <p class="newsletter-text">Subscribe to our newsletter and never miss a property update!</p>

      <form class="newsletter-form" @submit.prevent="handleSubscribe">
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          required
          class="newsletter-input"
        />
        <button type="submit" class="newsletter-button">Subscribe</button>
      </form>

      <p v-if="submitted" class="newsletter-success">✅ Thank you for subscribing!</p>
    </section>

  </div>
</template>

<style scoped>
.featured-section, .video-section, .why-us-section, .newsletter-section { @apply mb-40; }

.home-hero { @apply text-center py-8; }

.hero-title { @apply text-xl md:text-3xl font-bold mb-4; }

.hero-subtitle { @apply text-lg md:text-xl text-light-two dark:text-dark-two; }

.featured-section { @apply mt-4 text-center; }

.featured-title { @apply text-xl md:text-3xl font-bold mb-6 overline; }

.swiper-container-wrapper { @apply w-full mx-auto px-2 overflow-hidden; }

.property-swiper { @apply px-4 max-w-full; }

.video-section { @apply mt-10 text-center; }

.video-wrapper { @apply max-w-4xl mx-auto aspect-video; }

.video-frame { @apply w-full h-full rounded-lg shadow-lg; }

.why-us-section { @apply mt-12 text-center px-4; }

.section-title { @apply text-xl md:text-3xl font-bold mb-6; }

.benefits-grid { @apply grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6; }

.benefit-card { @apply p-6 bg-light-soft dark:bg-dark-soft rounded-lg shadow-md; }

.benefit-icon { @apply text-4xl text-amber-500 mb-2; }

.benefit-title { @apply text-lg font-semibold mb-2; }

.benefit-desc { @apply text-sm text-light-two dark:text-dark-two; }

.newsletter-section { @apply mt-16 text-center px-4 py-10 bg-light-soft dark:bg-dark-soft rounded-lg shadow-inner max-w-3xl mx-auto; }

.newsletter-text { @apply text-base md:text-lg mb-4 text-light-two dark:text-dark-two; }

.newsletter-form { @apply flex flex-col sm:flex-row justify-center items-center gap-4 text-lg; }

.newsletter-input { @apply px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-dark-one dark:bg-light-one shadow-sm w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-amber-500; }

.newsletter-button { @apply relative px-6 py-2 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600 transition shadow; }

.newsletter-success {
  @apply mt-4 font-bold text-lg text-green-600 dark:text-green-400;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
