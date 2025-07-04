<template>
  <footer class="site-footer">
    <div class="container">
      <p>&copy; {{ new Date().getFullYear() }} Nuxest Realty. All rights reserved.</p>
      <nav class="footer-links">
        <p>Terms</p>
        <!-- <NuxtLink to="/terms">Terms</NuxtLink> -->
        <p>Privacy</p>
        <!-- <NuxtLink to="/privacy">Privacy</NuxtLink> -->
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.site-footer { @apply bg-light-soft dark:bg-dark-soft py-4 border-t-2 border-dark-two dark:border-light-two w-full; }

.container { @apply max-w-7xl mx-auto px-4 text-center space-y-2 text-sm flex flex-col sm:flex-row items-center justify-between; }

.footer-links { @apply flex gap-4; }
</style>
