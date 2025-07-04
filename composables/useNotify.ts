/**
 * Reusable Notify composable
 * Pre-configured toasts for success & error
 */
import type { ToastOptions } from '~/types';

export function useNotify() {
  const toast = useToast();

  return {
    success(message: string, title = 'Success!', options: ToastOptions = {}) {
      toast.success({
        title, message,
        timeout: options.timeout ?? 5000,
        position: options.position ?? 'topLeft'
      });
    },

    error(message: string, title = 'Error!', options: ToastOptions = {}) {
      toast.error({
        title, message,
        timeout: options.timeout ?? 5000,
        position: options.position ?? 'topLeft'
      });
    }
  };
}
