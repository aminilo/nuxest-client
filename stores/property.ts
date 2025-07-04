import type { Property } from '~/types';

function base() { return useRuntimeConfig().public.apiBaseUrl }

export const usePropertyStore = defineStore('property', {
  state: () => ({
    properties: [] as Property[],
    isLoading: false,
    error: null as string | null
  }),

  actions: {
    async fetchUserProperties() {
      this.isLoading = true;
      this.error = null;
      try {
        const res = await fetch(`${base()}/properties/me`, { credentials: 'include' });
        if(!res.ok) throw new Error(res.statusText);
        this.properties = await res.json();
      } catch (e: any) {
        this.error = e.message;
      } finally { this.isLoading = false; }
    },

    /**
     * Create (if id===null) or Update (if id provided).
     * Always sends FormData so multer sees the `image` field.
     */
    async saveProperty(id: string | null, payload: Record<string, any>) {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, val]) => {
        if (val == null) return;
        if (val instanceof File) {
          formData.append('image', val);
        } else { formData.append(key, String(val)); }
      });

      const url = id ? `${base()}/properties/${id}` : `${base()}/properties`;
      const method = id ? 'PATCH' : 'POST';

      try {
        const res = await fetch(url, {
          method,
          credentials: 'include',
          body: formData
        });

        if(!res.ok) {
          const errText = await res.text();
          console.error('Server Response:', errText);
          throw new Error(`${method} failed: ${res.statusText}`);
        }

        await this.fetchUserProperties();

        const toastMsg = id ? 'Property updated successfully' : 'Property created successfully';
        const toastTitle = id ? 'Updated' : 'Created';
        useNotify().success(toastMsg, toastTitle, { position: 'topLeft'});
      } catch (e: any) {
        useNotify().error('Something went wrong while saving property.');
        throw e;
      }
    },

    async deleteProperty(id: string) {
      const toast = useToast();

      try {
        const res = await fetch(`${base()}/properties/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if(!res.ok) throw new Error('Failed to delete property');

        this.properties = this.properties.filter(p => p.id !== id);

        useNotify().success('Property removed successfully.', 'Removed');
      } catch (e) {
        useNotify().error('Failed to delete property.');
        console.error('[deleteProperty error]', e);
        throw e;
      }
    }
  }
});
