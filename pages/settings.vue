<script setup lang="ts">
const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBaseUrl;

const LOCAL_STORAGE_KEY = 'nuxest-settings';
const defaultSettings = { theme: 'system', privacyMode: false };

const settings = ref<null | typeof defaultSettings>(null);
const colorMode = useColorMode();

onMounted(()=> {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  settings.value = stored
    ? { ...defaultSettings, ...JSON.parse(stored) }
    : { ...defaultSettings }
  colorMode.preference = settings.value.theme;
})

watch(()=> settings.value, val=> {
    if(!val) return;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(val));
    colorMode.preference = val.theme;
  }, { deep: true }
)

function resetSettings() {
  settings.value = { ...defaultSettings };
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

const auth = useAuthStore();
const profile = reactive({ username: '', phone: '', bio: '' });

watch(()=> auth.user, u => {
    if(u) {
      profile.username = u.username || '';
      profile.phone = u.phone || '';
      profile.bio = u.bio || '';
    }
  }, { immediate: true }
);

function saveProfile() { auth.updateProfile({ ...profile }); }

function onAvatarChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if(!file) return;
  auth.updateProfile({ avatar: file });
}

useHead({
  title: 'Account Settings',
  meta: [
    { name: 'description', content: 'Manage your NuxEst account, update your profile, and customize your preferences.' },
    { property: 'og:title', content: 'Account Settings | NuxEst' },
    { property: 'og:description', content: 'Control your account settings, privacy mode, and profile details with NuxEst.' },
    { property: 'og:type', content: 'website' }
  ]
});
</script>

<template>
  <section class="setting-wrapper">
    <h2 class="text-2xl font-bold">Settings</h2>

    <div v-if="!settings" class="py-6 text-center">Loading settings…</div>
    <div v-else>
      <div class="setting-item">
        <label class="setting-label">Theme</label>
        <select v-model="settings.theme" class="setting-select">
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <!-- ONLY show once we have a "user" object -->
      <ClientOnly>
        <div v-if="auth.user" class="space-y-4 pt-6">
          <h2 class="text-xl font-bold">Profile</h2>

          <div class="flex items-center space-x-4">
            <img :src="auth.user?.avatar ? `${apiBaseUrl}${auth.user.avatar}` : `${apiBaseUrl}/uploads/user-avatars/default-avatar.jpg`" class="avatar" />
            <input type="file" @change="onAvatarChange" class="file-input" />
          </div>

          <div class="space-y-3">
            <input v-model="profile.username" placeholder="Username" class="setting-input" />
            <input v-model="profile.phone" placeholder="Phone" class="setting-input" />
            <textarea v-model="profile.bio" placeholder="Short bio..." class="setting-input resize-none h-24" />
          </div>

          <button @click="saveProfile" class="update-btn">Update Profile</button>
        </div>
      </ClientOnly>
    </div>
  </section>
</template>

<style scoped>
.setting-wrapper { @apply space-y-8 max-w-md mx-auto min-h-[90vh] p-4 text-base lg:text-lg; }

.setting-item { @apply flex items-center justify-between border-b border-dark-two dark:border-light-two py-4; }

.setting-label { @apply font-medium; }

.avatar { @apply w-24 h-24 rounded-full object-cover border-2 border-dark-two dark:border-light-two; }

.file-input { @apply text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer; }

.setting-select, .setting-input { @apply w-full px-3 py-2 rounded-md border border-dark-two dark:border-light-two bg-light-bg dark:bg-dark-bg text-light-two dark:text-dark-two focus:outline-none focus:ring-2 focus:ring-blue-500 transition; }

.setting-select { @apply w-1/2; }

.update-btn, .reset-btn { @apply px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition; }

.reset-btn { @apply bg-red-500 hover:bg-red-700; }
</style>
