"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "~/app/_components/submit-button";
import { type addProduct } from "~/server/actions/add-product";
import { CancelAddButton } from "./cancel-add-button";

type AddProductFormProps = {
  action: (data: FormData) => ReturnType<typeof addProduct>;
};
export const AddProductForm = ({ action }: AddProductFormProps) => {
  const [_, formAction] = useFormState(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (_: any, data: FormData) => {
      console.log("test");
      return await action(data);
    },
    {
      type: "success",
      data: {
        name: "",
        price: 0,
      },
    },
  );

  return (
    <form className="flex gap-3" action={formAction}>
      <div className="form-control flex-1">
        <span className="form-control-label">Product name</span>
        <input
          autoFocus
          type="text"
          name="name"
          className="form-control-input"
        />
      </div>

      <div className="form-control flex-initial">
        <span className="form-control-label">Price</span>
        <span className="form-control-prefix">$</span>
        <input
          type="number"
          name="price"
          className="form-control-input"
          inputMode="numeric"
        />
      </div>

      <SubmitButton className="btn-primary">+ Add</SubmitButton>
      <CancelAddButton />
    </form>
  );
};
