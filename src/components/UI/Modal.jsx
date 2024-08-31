import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom"

const Modal = forwardRef(function Modal({ children }, ref) {
    const modalRef = useRef()
    useImperativeHandle(ref, () => ({
        open: () => {
            modalRef.current.showModal();
        },
        close: () => {
            modalRef.current.close();
        }
    }));
    return (
        createPortal(<dialog ref={modalRef} className="w-1/2 min-h-2/3 border-sky-500 border-2  p-4 rounded-md shadow-lg">
            {children}
        </dialog>, document.getElementById("modal"))
    );
})
export default Modal;