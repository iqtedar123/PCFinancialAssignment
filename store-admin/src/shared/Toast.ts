import { toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export enum ToastType {
  errror = "error",
  success = "success",
}

export const notify = (message: string, toastType: ToastType) => {
  const options = {
    position: "bottom-center" as ToastPosition,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  };
  toast.clearWaitingQueue();
  if (ToastType.errror === toastType) {
    toast.error(message, options);
  } else {
    toast.success(message, options);
  }
};
