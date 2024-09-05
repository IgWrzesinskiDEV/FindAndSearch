/* eslint-disable react/prop-types */
import { twMerge } from "tailwind-merge";

export default function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={twMerge(
        " border-2 border-primary outline-none leading-tight text-white font-bold py-2 px-4 rounded flex items-center disabled:opacity-50 justify-center gap-2 transition-transform duration-200 hover:scale-105 disabled:scale-100",
        className
      )}
    >
      {children}
    </button>
  );
}
