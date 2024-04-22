import { revalidatePath } from "next/cache";
import { addProduct } from "~/server/api/products/actions";
import { Form } from "../_components/forms/form";
import { SubmitButton } from "../_components/submit-button";

export const AddProductForm = () => {
  return (
    <Form
      className="flex items-start gap-3"
      action={async (data) => {
        "use server";
        const result = await addProduct(data);

        if (result.type === "success") {
          revalidatePath("/products");
        }

        return result;
      }}
      initialState={{
        name: "",
        price: 0,
      }}
    >
      {({ FormControl }) => (
        <>
          <FormControl
            name="name"
            className="flex-1"
            label="Product name"
            type="text"
            autoFocus
            placeholder="Enter product name"
          />

          <FormControl
            name="price"
            className="flex-initial"
            label="Price"
            controlPrefix="$"
            type="number"
            inputMode="numeric"
            min={1}
            step={0.01}
            placeholder="Enter price"
          />

          <SubmitButton className="btn-primary">+ Add</SubmitButton>
        </>
      )}
    </Form>
  );
};
