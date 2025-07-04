<template>
  <header class="site-header">
    <div class="container">

      <NuxtLink to="/" class="logo">Nuxest Realty</NuxtLink>

      <nav class="nav">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/properties" class="nav-link">Properties</NuxtLink>
      </nav>

      <ThemeToggle />
      
    </div>
  </header>
</template>

<style scoped>
.site-header { @apply bg-light-soft dark:bg-dark-soft py-4 shadow-md; }

.container { @apply max-w-7xl mx-auto px-4 flex justify-between items-center; }

.logo { @apply text-xl font-semibold tracking-tight; }

.nav { @apply flex gap-6; }

.nav-link { @apply text-sm hover:underline; }
</style>
