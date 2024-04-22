"use client";

import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";

export const SubmitButton = ({
  children,
  working,
  className,
}: {
  children: React.ReactNode;
  working?: React.ReactNode;
  className?: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className={twMerge("btn", "btn-primary", className)}
    >
      {pending && working ? working : children}
    </button>
  );
};
