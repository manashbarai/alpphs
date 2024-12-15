// toastUtils.js
import { toast } from 'react-toastify';

export const showToast = (message) => {
  toast(message, {
    autoClose: 1500, // Toast will close after 1.5 seconds
    hideProgressBar: true, // Hides the progress bar
    closeOnClick: true, // Allows closing on click
    pauseOnHover: false, // Prevents pause on hover
    draggable: false, // Disables draggable feature
  });
};
