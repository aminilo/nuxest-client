import axios from 'axios';

export const api = () => {
  return axios.create({
    // const { public: { apiBaseUrl } } = useRuntimeConfig();
    // baseURL: apiBaseUrl,
    baseURL: useRuntimeConfig().public.apiBaseUrl,
    // headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN', /* cookie the server sets */
    xsrfHeaderName: 'x-csrf-token' /* header to send it back in */
  });
};
