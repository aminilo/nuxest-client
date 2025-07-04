export default defineNuxtPlugin(async () => {
  const auth = useAuthStore();
  if (auth.token && !auth.user) {
    try {
      await auth.fetchProfile();
    } catch (err) {
      console.error('[auth-init plugin]', err);
      auth.logout();
    }
  }
})
