import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({ children }, ref) {
  const modalRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        setIsOpen(true);
        document.body.classList.add("no-scroll");
      },
      close: () => {
        modalRef.current.close();
        setIsOpen(false);
        document.body.classList.remove("no-scroll");
      },
    }),
    [setIsOpen]
  );
  return createPortal(
    <>
      {isOpen && (
        <dialog
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-auto w-full   bg-transparent h-[100dvh] "
        >
          <div className="relative w-10/12 p-4 my-6 overflow-auto border-2 rounded-md shadow-lg max-h-[90vh] lg:w-1/2 bg-bgcColor border-sky-500">
            {children}
          </div>
        </dialog>
      )}
      {isOpen && <div className="fixed inset-0 z-40 bg-black opacity-50"></div>}
    </>,
    document.getElementById("modal")
  );
});
export default Modal;
