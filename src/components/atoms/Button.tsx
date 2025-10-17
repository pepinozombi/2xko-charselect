import React from "react";
import clsx from "clsx";

export function Button({ children, className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={clsx("px-4 py-2 rounded-xl font-semibold transition", className)}>
      {children}
    </button>
  );
}