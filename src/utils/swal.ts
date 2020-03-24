import Swal from "sweetalert2";

const SweetAlert = {
    success: (message: string) => {
        return Swal.fire({
            title: "성공!",
            text: message,
            icon: "success",
            confirmButtonText: "확인",
            heightAuto: false
        });
    },
    error: (message: string) => {
        return Swal.fire({
            title: "에러!",
            text: message,
            icon: "error",
            confirmButtonText: "확인",
            heightAuto: false
        });
    }
};

export default SweetAlert;
