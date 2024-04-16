"use client";

import { createContext, useContext, useMemo } from "react";
import { useFormState } from "react-dom";
import {
  type FormAction,
  type FormActionResult,
  type ValidationErrors,
} from "~/server/forms";

type FormProviderContextProps<TAction extends FormAction<unknown, unknown>> = {
  readonly result:
    | (TAction extends FormAction<unknown, infer TResult> ? TResult : never)
    | null;
  readonly errors: ValidationErrors<
    TAction extends FormAction<infer TIn, unknown> ? TIn : never
  >;
};

const FormProviderContext = createContext<
  FormProviderContextProps<FormAction<unknown, unknown>>
>({
  result: false,
  errors: {},
});

type FormProviderProps<TIn, TResult> = {
  className?: string;
  action: FormAction<TIn, TResult>;
  initialState: TResult;
  children?: React.ReactNode;
};

export const FormProvider = ({
  className,
  action,
  initialState,
  children,
}: FormProviderProps<unknown, unknown>) => {
  const [state, formAction] = useFormState(
    async (_: FormActionResult<unknown, unknown> | null, data: FormData) => {
      return await action(data);
    },
    {
      type: "success",
      data: initialState,
    },
  );

  const contextValue = useMemo(() => {
    const result = state.type === "success" ? state.data : null;
    const errors =
      state.type === "error" && state.reason === "validation"
        ? state.errors
        : {};

    return {
      result,
      errors,
    };
  }, [state]);

  return (
    <FormProviderContext.Provider value={contextValue}>
      <form action={formAction} className={className}>
        {children}
      </form>
    </FormProviderContext.Provider>
  );
};

export const useFormProvider = () => {
  return useContext(FormProviderContext);
};
