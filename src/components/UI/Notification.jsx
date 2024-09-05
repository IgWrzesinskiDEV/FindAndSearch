import { createPortal } from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notification() {
  return createPortal(
    <ToastContainer
      position="bottom-right"
      autoClose={6000}
      theme="dark"
      className="z-50"
    />,
    document.getElementById("notification")
  );
}
