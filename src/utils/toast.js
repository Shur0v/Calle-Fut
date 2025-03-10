import toast from 'react-hot-toast';

// Success toast with custom duration
export const showSuccess = (message, duration = 3000) => {
  toast.success(message, { duration });
};

// Error toast with custom duration
export const showError = (message, duration = 3000) => {
  toast.error(message, { duration });
};

// Info toast with custom duration
export const showInfo = (message, duration = 3000) => {
  toast(message, { duration });
};

// Loading toast that returns a toastId which can be used to dismiss
export const showLoading = (message = 'Loading...') => {
  return toast.loading(message);
};

// Dismiss a specific toast by ID
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

// Promise toast for async operations
export const promiseToast = (
  promise,
  {
    loading = 'Loading...',
    success = 'Success!',
    error = 'Error occurred'
  }
) => {
  return toast.promise(promise, {
    loading,
    success,
    error
  });
}; 