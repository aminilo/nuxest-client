<script setup lang="ts">
import { getTeamMembers } from '~/services/teamService';

const valueCards = [
  { icon: 'mdi:handshake', title: 'Trust', para: 'Every listing is verified. Every agent is accountable. We build trust with transparency.' },
  { icon: 'mdi:lightbulb-on', title: 'Innovation', para: 'We leverage modern technologies to create the best real estate experience.' },
  { icon: 'mdi:account-group', title: 'Community', para: 'We believe in empowering local communities through access to reliable housing resources.' }
];

const { data: members, pending, error } = await useAsyncData('members', ()=> getTeamMembers().then(res=> res.data));

useHead({
  title: 'About Us',
  meta: [
    { name: 'description', content: 'Discover NuxEst — the trusted, innovative real estate platform connecting people with their dream properties.' },
    { property: 'og:title', content: 'About NuxEst' },
    { property: 'og:description', content: 'Learn how NuxEst builds trust and community through technology and verified listings.' },
    { property: 'og:type', content: 'website' },
    // { property: 'og:image', content: '/default-og-image.jpg' } /* Ideally an image hosted in /public */
  ]
});
</script>

<template>
  <div class="about-page">

    <section class="about-hero">
      <h1 class="about-title">About NuxEst</h1>
      <p class="about-subtitle">Connecting people with their dream properties through trust and innovation.</p>
    </section>

    <section class="about-story">
      <h2 class="section-title">Our Story</h2>
      <p class="section-text">
        NuxEst was founded with a single mission: to simplify the real estate experience.
        Whether you are buying your first home, investing in a property, or renting an apartment,
        we provide a seamless and secure platform to make your journey easy.
      </p>
    </section>

    <section class="about-values">
      <h2 class="section-title">Our Core Values</h2>
      <div class="values-grid">
        <div v-for="card in valueCards" :key="card.title" class="value-card">
          <Icon :name="card.icon" class="value-icon" />
          <h3 class="value-title">{{ card.title }}</h3>
          <p class="value-text">{{ card.para }}</p>
        </div>
      </div>
    </section>

    <section class="about-team">
      <h2 class="section-title">Meet the Team</h2>
      <p class="section-text">We're a small, passionate team of developers, designers, and property experts based across the globe.</p>

      <div v-if="pending" class="text-center my-10">Loading team members...</div>
      <div v-else-if="error" class="text-center text-red-500 my-10">Failed to load team members.</div>

      <div v-else class="team-grid">
        <div v-for="member in members" :key="member.id" class="team-card">
          <img :src="member.imageUrl" :alt="member.name" class="team-avatar" />
          <h3 class="team-name">{{ member.name }}</h3>
          <p class="team-role">{{ member.role }}</p>
          <p class="team-bio">{{ member.bio }}</p>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
section { @apply py-4; }
.about-page { @apply max-w-5xl mx-auto min-h-[90vh] px-4 py-8; }

.about-hero { @apply text-center mb-12; }

.about-title { @apply text-3xl md:text-4xl font-bold mb-2; }

.about-subtitle { @apply text-lg text-light-two dark:text-dark-two; }

.section-title { @apply text-2xl font-bold mb-4 text-center; }

.section-text { @apply text-base text-light-two dark:text-dark-two text-center max-w-3xl mx-auto mb-8; }

.about-values { @apply mt-10; }

.values-grid { @apply grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-6; }

.value-card { @apply bg-light-soft dark:bg-dark-soft p-6 rounded-md text-center shadow; }

.value-icon { @apply text-4xl text-amber-500 mb-2; }

.value-title { @apply text-lg font-bold mb-1; }

.value-text { @apply text-sm text-light-two dark:text-dark-two; }

.about-team { @apply mt-16 text-center; }

.team-grid { @apply grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8; }

.team-card { @apply bg-light-soft dark:bg-dark-soft hover:bg-dark-two dark:hover:bg-light-one p-6 rounded-md text-center shadow transition hover:shadow-lg; }

.team-avatar { @apply w-24 h-24 mx-auto rounded-full object-cover mb-2 border-2 border-amber-400; }

.team-name { @apply text-lg font-semibold; }

.team-role { @apply text-sm text-amber-600 dark:text-amber-400 mb-1; }

.team-bio { @apply text-sm text-light-two dark:text-dark-two; }
</style>
