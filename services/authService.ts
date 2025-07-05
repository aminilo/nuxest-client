import type { UpdateProfilePayload } from '~/types';
import { api } from '~/utils/api';

/*export async function getCsrfToken() {
  const res = await api().get('/csrf/csrf-token');
  return res.data.csrfToken;
}*/

export async function login(email: string, password: string) {
  return api().post('/auth/login', { email, password });
}

export async function register(email: string, password: string) {
  return api().post('/auth/register', { email, password });
}

export async function logout() {
  return api().post('/auth/logout');
}

export async function getProfile() {
  return api().get('/auth/profile');
}

export async function updateProfile(payload: UpdateProfilePayload) {
  const data = new FormData();
  if(payload.username) data.append('username', payload.username);
  if(payload.phone) data.append('phone', payload.phone);
  if(payload.bio) data.append('bio', payload.bio);
  if(payload.avatar) data.append('avatar', payload.avatar);

  return api().patch('/auth/profile', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
