import axios from 'axios';

export const api = () => {
  const config = useRuntimeConfig()
  return axios.create({
    baseURL: config.public.apiBaseUrl,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });
};
