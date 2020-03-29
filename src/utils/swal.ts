import Swal from 'sweetalert2';

const SweetAlert = {
  success: (message: string) => Swal.fire({
    title: '성공!',
    text: message,
    icon: 'success',
    confirmButtonText: '확인',
    heightAuto: false,
  }),
  error: (message: string, title = '이런!') => Swal.fire({
    title,
    text: message,
    icon: 'error',
    confirmButtonText: '확인',
    heightAuto: false,
  }),
  confirm: (message: string, title?: string) => Swal.fire({
    title: title || '경고',
    text: message,
    icon: 'warning',
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    showCancelButton: true,
    showCloseButton: true,
  }),
};

export default SweetAlert;
