"use client";

import { type NestedKeyOf } from "~/server/forms/helpers";
import { twMerge } from "tailwind-merge";
import { useFormProvider } from "./form-provider";

export type FormControlProps<TIn> = {
  name: NestedKeyOf<TIn>;
  label?: React.ReactNode;
  className?: string;
  controlPrefix?: React.ReactNode;
} & JSX.IntrinsicElements["input"];

export function FormControl<TIn>({
  label,
  className,
  name,
  controlPrefix,
  ...inputProps
}: FormControlProps<TIn>) {
  const { errors } = useFormProvider();
  const error = (errors as Record<string, string>)[name];
  return (
    <div
      className={twMerge(
        "form-control",
        error && "form-control-error",
        className,
      )}
    >
      {label && <span className="form-control-label">{label}</span>}
      {controlPrefix && (
        <span className="form-control-prefix">{controlPrefix}</span>
      )}
      <input {...inputProps} name={name} className="form-control-input" />
      {error && <span className="form-control-hint">{error}</span>}
    </div>
  );
}
