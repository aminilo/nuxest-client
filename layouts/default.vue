<script setup lang="ts">
const auth = useAuthStore();
const router = useRouter();
const sidebarOpen = ref(false);
const isLargeScreen = ref(false);
const layoutRef = ref<HTMLElement | null>(null);

const navItems = [
  { 
    path: '/', 
    title: 'Home', 
    icon: 'material-symbols:house-outline-rounded',
    text: 'Home'
  },
  { 
    path: '/about', 
    title: 'About', 
    icon: 'material-symbols:info',
    text: 'About'
  },
  { 
    path: '/properties', 
    title: 'Properties', 
    icon: 'material-symbols:real-estate-agent-outline',
    text: 'Properties'
  },
  { 
    path: '/settings', 
    title: 'Settings', 
    icon: 'material-symbols:settings-outline-rounded',
    text: 'Settings'
  }
];

function handleClickOutside(event: MouseEvent) {
  if (
    sidebarOpen.value &&
    layoutRef.value &&
    !layoutRef.value.querySelector('.sidebar')?.contains(event.target as Node)
  ) { sidebarOpen.value = false; }
}

function handleLogout() { auth.logout(); router.push('/'); }

onMounted(()=> {
  const checkScreen = ()=> (isLargeScreen.value = window.innerWidth >= 768);
  checkScreen();
  window.addEventListener('resize', checkScreen);
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(()=> document.removeEventListener('click', handleClickOutside));
</script>

<template>
  <div class="layout" ref="layoutRef">

    <aside
      :class="['sidebar', { 'sidebar-open': sidebarOpen }]"
      @mouseenter="isLargeScreen && (sidebarOpen = true)"
      @mouseleave="isLargeScreen && (sidebarOpen = false)"
    >
      <div class="logo-area underline" @click="sidebarOpen = !sidebarOpen">
        <Icon
          name="material-symbols:house-outline-rounded"
          class="nav-icon logo-icon"
        />
        <span class="logo-text" v-if="sidebarOpen">NuxEst</span>
      </div>

      <nav class="nav-links">
        <ThemeToggle class="mb-4" />
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path"
          :title="item.title"
          v-slot="{ isActive }"
        >
          <div :class="[ 'nav-item', isActive && 'active-nav-item' ]">
            <Icon :name="item.icon" class="nav-icon" />
            <span class="nav-text" v-if="sidebarOpen">{{ item.text }}</span>
          </div>
        </NuxtLink>

        <NuxtLink v-if="auth.isAuthenticated" to="/dashboard" title="dashboard" v-slot="{ isActive }" class="mt-4">
          <div :class="[ 'nav-item', isActive && 'active-nav-item' ]">
            <Icon name="material-symbols:real-estate-agent-outline" class="nav-icon" />
            <span class="nav-text" v-if="sidebarOpen">Dashboard</span>
          </div>
        </NuxtLink>
      </nav>

      <div class="mt-auto ml-1">
        <UserMenu />
      </div>

    </aside>

    <div v-if="sidebarOpen" class="fixed inset-0 bg-black opacity-40 z-30 transition-opacity duration-300"></div>

    <div :class="['main-wrapper', { 'main-wrapper-shifted': sidebarOpen }]">
      <main class="main-content">
        <slot />
      </main>
      <Footer />
    </div>

  </div>
</template>

<style scoped>
.layout { @apply text-light-two dark:text-dark-two flex min-h-screen overflow-hidden relative; }

.sidebar { @apply w-12 border-r-2 border-dark-two dark:border-light-two fixed top-0 left-0 bottom-0 z-40 bg-light-soft dark:bg-dark-soft px-1 py-20 flex flex-col transition-all duration-300 select-none; }

.sidebar-open { @apply w-44; }

.logo-area { @apply flex items-center gap-1 ml-1 mb-6 cursor-pointer; }

.logo-text { @apply text-xl font-bold; }

.logo-icon { @apply bg-light-two dark:bg-dark-two p-4 text-4xl transition-transform duration-300 animate-bounce; }

.nav-links { @apply flex flex-col gap-2; }

.nav-item { @apply p-2 flex items-center gap-1 rounded hover:bg-dark-two dark:hover:bg-dark-bg hover:indent-1 hover:font-bold transition-colors duration-200; }

.active-nav-item { @apply bg-dark-two dark:bg-dark-bg indent-1 font-bold; }

.nav-text { @apply text-base; }

.nav-icon { @apply text-xl; }

.main-wrapper { @apply bg-light-bg dark:bg-dark-bg relative ml-12 flex flex-col flex-1 min-h-screen min-w-0 transition-all duration-300; }

.main-wrapper-shifted { @apply ml-44; }

.main-content { @apply container mx-auto px-2 py-10; }

@media (max-width: 768px) {
  .sidebar { @apply w-12; }

  .sidebar-open { @apply w-44; }

  .main-wrapper { @apply ml-10; }

  .main-wrapper-shifted { @apply ml-10; } 
}
</style>
