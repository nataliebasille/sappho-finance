import { ProductsAddLink } from "./add/link";

export default function ProductsPage() {
  return (
    <div className="flex">
      <ProductsAddLink className="btn-primary btn ml-auto">
        + Add new product
      </ProductsAddLink>
    </div>
  );
}
