<script setup lang="ts">
const auth = useAuthStore();
const router = useRouter();
const form = reactive({ email: '', password: '' });
const error = ref('');

async function registerUser() {
  const success = await auth.register(form.email, form.password);
  if(success) router.push('/login');
  else error.value = 'Invalid email or password';
}

useHead({
  title: 'Register',
  meta: [
    { name: 'description', content: 'Create your free NuxEst account and start your real estate journey today.' },
    { property: 'og:title', content: 'Register | NuxEst' },
    { property: 'og:description', content: 'Sign up to explore verified property listings and manage your profile.' },
    { property: 'og:type', content: 'website' }
  ]
});
</script>

<template>
  <section class="auth-wrapper">
    <div class="auth-box">
      <h1 class="auth-title">Register</h1>
      <form @submit.prevent="registerUser" class="auth-form">
        <input v-model="form.email" type="email" required placeholder="Email" class="auth-input" />
        <input v-model="form.password" type="password" required placeholder="Password" class="auth-input" />
        <button type="submit" class="auth-button">Register</button>
        <p v-if="error" class="auth-error">{{ error }}</p>
        <p class="auth-footer">Already have an account? <NuxtLink to="/login" class="auth-link">Login</NuxtLink></p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.auth-wrapper { @apply min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg; }

.auth-box { @apply w-full max-w-md -translate-y-20 bg-light-soft dark:bg-dark-soft shadow-md rounded-lg p-8 border border-dark-two dark:border-light-two; }

.auth-title { @apply text-2xl font-bold mb-6 text-center; }

.auth-form { @apply space-y-4; }

.auth-input { @apply w-full px-4 py-2 rounded bg-light-bg dark:bg-dark-bg outline-none ring-1 focus:ring-4; }

.auth-button { @apply w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition; }

.auth-error { @apply text-red-600 text-sm; }

.auth-footer { @apply text-sm text-center text-light-two dark:text-dark-two; }

.auth-link { @apply font-bold p-2 text-blue-500 hover:underline; }
</style>
