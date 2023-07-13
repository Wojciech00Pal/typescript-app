import {toast, TypeOptions} from "react-toastify";

const toastNotify = (message:string, type: TypeOptions) =>{
    toast(message, {
        type:type,
        position: "top-right",
        autoClose: 400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
};

export default toastNotify;
