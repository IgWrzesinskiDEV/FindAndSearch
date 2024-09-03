/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Input = forwardRef(function Input(
  {
    label,
    name,
    type = "text",
    error,
    editedValue = "",
    labelClassName = "",
    ...props
  },
  ref
) {
  return (
    <div className="flex flex-col items-center w-full gap-y-2">
      {label && (
        <label htmlFor={name} className={labelClassName}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        ref={ref}
        defaultValue={editedValue}
        {...props}
        className={twMerge(
          "p-2 outline w-3/4 outline-primaryDarker outline-2 focus:outline-primary",
          props.className
        )}
      />
      {error && <p className="text-red-500">Required value</p>}
    </div>
  );
});
export default Input;
