/* eslint-disable react/prop-types */

import { twMerge } from "tailwind-merge";

export default function Section({ children, className }) {
  return (
    <section className={twMerge("flex flex-col items-center gap-4", className)}>
      {children}
    </section>
  );
}
