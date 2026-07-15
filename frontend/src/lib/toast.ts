import { type ToastOptions, toast } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

export function showSuccess(message: string, options?: ToastOptions) {
  toast.success(message, { ...defaultOptions, ...options });
}

export function showError(message: string, options?: ToastOptions) {
  toast.error(message, { ...defaultOptions, autoClose: 5000, ...options });
}
