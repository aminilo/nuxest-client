<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useFetch } from '#app';

const auth = useAuthStore();
const form = reactive({
  username: auth.user?.username || '',
  password: '',
});

const isLoading = ref(false);
const message = ref('');

async function updateProfile() {
  isLoading.value = true;
  message.value = '';

  try {
    const { error } = await useFetch('/api/auth/profile', {
      method: 'PATCH',
      body: { ...form },
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });

    if (error.value) throw new Error(error.value?.data?.message || 'Update failed');

    // Fetch updated profile
    const res = await $fetch('/api/auth/profile', {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    auth.setUser(res); // You need to implement setUser() in your store

    message.value = 'Profile updated successfully!';
  } catch (err: any) {
    message.value = err.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <section class="profile-edit">
    <h1 class="text-2xl font-bold mb-4">Edit Profile</h1>

    <form @submit.prevent="updateProfile" class="space-y-4">
      <div>
        <label class="form-label">Email (read-only)</label>
        <input type="email" :value="auth.user?.email" disabled class="form-input opacity-50 cursor-not-allowed" />
      </div>

      <div>
        <label class="form-label">Username</label>
        <input v-model="form.username" type="text" class="form-input" />
      </div>

      <div>
        <label class="form-label">New Password (optional)</label>
        <input v-model="form.password" type="password" class="form-input" />
      </div>

      <button type="submit" class="btn-primary" :disabled="isLoading">
        {{ isLoading ? 'Saving...' : 'Update Profile' }}
      </button>

      <p v-if="message" class="mt-2 text-sm text-center">{{ message }}</p>
    </form>
  </section>
</template>

<style scoped>
.profile-edit { @apply max-w-md mx-auto p-4 bg-light-bg dark:bg-dark-bg rounded shadow; }

.form-label { @apply block text-sm font-medium mb-1; }

.form-input { @apply w-full px-3 py-2 border border-dark-two dark:border-light-two rounded bg-light-soft dark:bg-dark-soft; }

.btn-primary { @apply w-full px-4 py-2 bg-dark-two dark:bg-light-two text-white rounded hover:opacity-90 transition; }
</style>
