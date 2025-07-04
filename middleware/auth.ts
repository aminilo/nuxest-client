export default defineNuxtRouteMiddleware(async (to, from)=> {
  const auth = useAuthStore();
  if(!auth.user) await auth.fetchProfile();
  if(!auth.user) return navigateTo('/login');
});
