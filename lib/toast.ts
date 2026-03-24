import { toast } from 'sonner';

export const showSuccess = (message: string) => {
  toast.success(message, {
    description: 'Operation completed successfully',
    duration: 3000,
  });
};

export const showError = (message: string, description?: string) => {
  toast.error(message, {
    description: description || 'An error occurred',
    duration: 4000,
  });
};

export const showInfo = (message: string, description?: string) => {
  toast.info(message, {
    description: description || '',
    duration: 3000,
  });
};

export const showWarning = (message: string, description?: string) => {
  toast.warning(message, {
    description: description || '',
    duration: 3000,
  });
};

export const showLoading = (message: string) => {
  return toast.loading(message);
};

export const dismissToast = (id: string | number) => {
  toast.dismiss(id);
};
