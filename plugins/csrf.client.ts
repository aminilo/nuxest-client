import { defineNuxtPlugin } from '#app';
import { api } from '~/utils/api';

export default defineNuxtPlugin(async () => {
  // const api = useNuxtApp().$api; /* or import api() helper */
  /* To set the XSRF-TOKEN cookie for all subsequent calls */
  await api().get('/csrf/csrf-token');
});
