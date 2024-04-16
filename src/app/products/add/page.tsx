import { addProduct } from "~/server/actions/add-product";
import { CancelAddButton } from "./cancel-add-button";
import { SubmitButton } from "~/app/_components/submit-button";
import { Form } from "~/app/_components/forms/form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function ProductsAddPage() {
  return (
    <Form
      action={async (data) => {
        "use server";
        const result = await addProduct(data);

        if (result.type === "success") {
          revalidatePath("/products");
          redirect("/products");
        }

        return result;
      }}
      initialState={{
        name: "",
        price: 0,
      }}
      className="flex gap-3"
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
          <CancelAddButton />
        </>
      )}
    </Form>
  );
}
