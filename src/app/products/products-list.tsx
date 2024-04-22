import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { getProducts } from "~/server/api/products/queries";

export async function ProductsList() {
  const products = await getProducts();

  return products.length ? (
    <div className="grid grid-cols-[1fr_max-content] *:py-2">
      <div className="font-bold">Name</div>
      <div className="text-right font-bold">Price</div>
      {products.map((product) => (
        <Fragment key={product.id}>
          <div className={twMerge("border-t border-secondary-base")}>
            {product.name}
          </div>
          <div
            className={twMerge("text-right", "border-t border-secondary-base")}
          >
            ${(product.priceHistory[0].price / 100).toFixed(2)}
          </div>
        </Fragment>
      ))}
    </div>
  ) : (
    <i className="block text-center">You have no products</i>
  );
}
