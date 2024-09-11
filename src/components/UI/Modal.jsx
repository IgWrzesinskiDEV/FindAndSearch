/* eslint-disable react/prop-types */
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({ children }, ref) {
  const modalRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        modalRef.current.show();
        setIsOpen(true);
      },
      close: () => {
        modalRef.current.close();

        setIsOpen(false);
      },
    }),
    [setIsOpen]
  );
  return createPortal(
    <>
      <dialog
        ref={modalRef}
        className="z-50 w-10/12 p-4 my-6 -translate-x-1/2 -translate-y-1/2 border-2 rounded-md shadow-lg landscape:-translate-y-1/4 landscape:lg:-translate-y-1/2 lg:my-0 top-1/2 left-1/2 lg:w-1/2 min-h-2/3 border-sky-500"
      >
        {children}
      </dialog>
      {isOpen && <div className="fixed inset-0 z-30 bg-black opacity-50"></div>}
    </>,
    document.getElementById("modal")
  );
});
export default Modal;
