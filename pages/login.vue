<script setup lang="ts">
const auth = useAuthStore();
const router = useRouter();
const form = reactive({ email: '', password: '' });
const error = ref('');

async function handleLogin() {
  const success = await auth.login(form.email, form.password);
  if(success) router.push('/');
  else error.value = 'Invalid email or password';
}

useHead({
  title: 'Login',
  meta: [
    { name: 'description', content: 'Login to your NuxEst account and explore verified property listings.' },
    { property: 'og:title', content: 'Login | NuxEst' },
    { property: 'og:description', content: 'Access your account to manage your properties and discover new listings.' },
    { property: 'og:type', content: 'website' }
  ]
});
</script>

<template>
  <section class="auth-wrapper">
    <div class="auth-box">
      <h2 class="auth-title">Login</h2>
      <form @submit.prevent="handleLogin" class="auth-form">
        <input v-model="form.email" type="email" required placeholder="Email" class="auth-input" />
        <input v-model="form.password" type="password" required placeholder="Password" class="auth-input" />
        <button type="submit" class="auth-button">Login</button>
        <p v-if="error" class="auth-error">{{ error }}</p>
        <p class="auth-footer">Don't have an account? <NuxtLink to="/register" class="auth-link">Register</NuxtLink></p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.auth-wrapper { @apply min-h-screen flex items-center justify-center; }

.auth-box { @apply w-full max-w-md -translate-y-20 bg-light-soft dark:bg-dark-soft shadow-md rounded-lg p-8 border border-dark-two dark:border-light-two; }

.auth-title { @apply text-2xl font-bold mb-6 text-center; }

.auth-form { @apply space-y-4; }

.auth-input { @apply w-full px-4 py-2 rounded bg-light-bg dark:bg-dark-bg outline-none ring-1 focus:ring-4; }

.auth-button { @apply w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition; }

.auth-error { @apply text-red-600 text-sm font-bold; }

.auth-footer { @apply text-sm text-center text-light-two dark:text-dark-two; }

.auth-link { @apply font-bold p-2 text-blue-500 hover:underline; }
</style>
