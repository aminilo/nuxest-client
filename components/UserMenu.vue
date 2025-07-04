<script setup lang="ts">
const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBaseUrl;

const auth = useAuthStore();
const menuOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

const toggleMenu = ()=> menuOpen.value = !menuOpen.value;

function handleLogout() {
  auth.logout();
  menuOpen.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    menuOpen.value = false;
  }
}

onMounted(()=> document.addEventListener('click', handleClickOutside));
onBeforeUnmount(()=> document.removeEventListener('click', handleClickOutside));
</script>

<template>
  <div class="user-menu" ref="menuRef">
    <button class="avatar-btn" @click.stop="toggleMenu">
      <img v-if="auth.isAuthenticated" :src="auth.user?.avatar ? `${apiBaseUrl}${auth.user.avatar}` : `${apiBaseUrl}/uploads/user-avatars/default-avatar.jpg`" alt="Avatar" class="avatar-img" />
      <Icon v-else name="material-symbols:account-circle" class="avatar-fallback" />
    </button>

    <div v-if="menuOpen" class="dropdown">
      <div v-if="auth.isAuthenticated" class="menu-auth">
        <div class="user-email">{{ auth.user?.email }}</div>
        <hr class="menu-divider" />
        <button class="menu-item" @click="handleLogout">Logout</button>
      </div>
      <div v-else>
        <NuxtLink to="/login" class="menu-item">Login</NuxtLink>
        <NuxtLink to="/register" class="menu-item">Register</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-menu { @apply relative; }

.avatar-btn { @apply flex items-center gap-2 bg-light-soft dark:bg-dark-soft rounded-full shadow-md border border-amber-500 transition; }

.avatar-img { @apply w-11 h-11 rounded-full object-cover; }

.avatar-fallback { @apply w-9 h-9; }

.dropdown { @apply absolute -top-6 left-12 w-48 bg-light-bg dark:bg-dark-bg rounded shadow-md border-2 border-amber-500 py-1 z-50; }

.menu-auth { @apply text-sm; }

.user-email { @apply px-2 py-1 truncate; }

.menu-divider { @apply border-t border-dark-two dark:border-light-two; }

.menu-item { @apply block w-full text-left px-4 py-2 hover:bg-dark-two dark:hover:bg-light-two; }
</style>
