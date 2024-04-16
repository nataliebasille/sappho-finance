import { type FormAction } from "~/server/forms";
import { FormProvider, useFormProvider } from "./form-provider";
import { type ComponentType, useCallback } from "react";
import { type FormControlProps, FormControl } from "./form-control";
import { type FormErrorProps, FormError } from "./form-error";

type ChildrenFactoryProps<TIn> = {
  FormError: ComponentType<FormErrorProps<TIn>>;
  FormControl: ComponentType<FormControlProps<TIn>>;
};

type ChildrenFactory<TIn> = (
  props: ChildrenFactoryProps<TIn>,
) => React.ReactNode;

type FormProps<TIn, TResult> = {
  className?: string;
  action: FormAction<TIn, TResult>;
  initialState: TIn;
  children?: ChildrenFactory<TIn>;
};

const WithinFormContext = <TIn, TResult>({
  children,
}: Pick<FormProps<TIn, TResult>, "children">) => {
  return children?.({ FormError, FormControl });
};

export const Form = <TIn, TResult>({
  children,
  ...formProps
}: FormProps<TIn, TResult>) => {
  return (
    <FormProvider {...formProps}>
      <WithinFormContext>{children}</WithinFormContext>
    </FormProvider>
  );
};
