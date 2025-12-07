import Swal, { SweetAlertOptions } from 'sweetalert2';

export const showSuccess = (message: string) => {
  return Swal.fire({
    icon: 'success',
    title: 'Success!',
    text: message,
    timer: 2000,
    showConfirmButton: false,
  });
};

export const showError = (message: string) => {
  return Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    confirmButtonColor: '#dc2626',
  });
};

export const showConfirm = async (
  title: string,
  text: string,
  confirmButtonText = 'Yes, delete it!'
): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText,
    cancelButtonText: 'Cancel',
  });

  return result.isConfirmed;
};

export const showLoading = (message = 'Processing...') => {
  return Swal.fire({
    title: message,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeLoading = () => {
  Swal.close();
};

export const showValidationError = (message: string) => {
  return Swal.fire({
    icon: 'warning',
    title: 'Validation Error',
    text: message,
    confirmButtonColor: '#2563eb',
  });
};
