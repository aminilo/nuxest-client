import type { User } from '~/types';
import { login, register, logout, getProfile, updateProfile } from '~/services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | User,
  }),
  persist: true,
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async login(email: string, password: string) {
      try {
        await login(email, password); /* Backend sets cookie */
        await this.fetchProfile();
        useNotify().success('You have logged in successfully');
        return true;
      } catch (e) {
        useNotify().error('Invalid email or password', 'Login Failed');
        console.error('[login error]', e);
        return false;
      }
    },

    async register(email: string, password: string) {
      try {
        await register(email, password); /* Backend sets cookie */
        await this.fetchProfile();
        useNotify().success('Your account has been created');
        return true;
      } catch (e) {
        useNotify().error('Could not register, try again', 'Registration Failed');
        console.error('[register error]', e);
        return false;
      }
    },

    async fetchProfile() {
      try {
        const res = await getProfile();
        this.user = res.data;
      } catch (e) {
        console.error('[fetchProfile error]', e);
        this.logout();
      }
    },

    async logout() {
      this.user = null;
      try {
        await logout();
      } catch (e) { console.error('[logout error]', e); }
      useNotify().success('You have logged out successfully');
    },

    async updateProfile(payload: { username?: string; phone?: string; bio?: string; avatar?: File }) {
      try {
        await updateProfile(payload);
        useNotify().success('Your profile has updated successfully');
        await this.fetchProfile();
      } catch (e) {
        useNotify().error('Could not update your profile', 'Error', { position: 'topLeft' });
        console.error('[updateProfile error]', e);
        throw e;
      }
    }
  }
});
