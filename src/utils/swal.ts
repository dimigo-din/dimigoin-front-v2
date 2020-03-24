import Swal from 'sweetalert2';

const SweetAlert = {
  success: (message: string) => Swal.fire({
    title: '성공!',
    text: message,
    icon: 'success',
    confirmButtonText: '확인',
    heightAuto: false,
  }),
  error: (message: string) => Swal.fire({
    title: '이런!',
    text: message,
    icon: 'error',
    confirmButtonText: '확인',
    heightAuto: false,
  }),
};

export default SweetAlert;
