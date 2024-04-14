import { Suspense, type ReactNode } from "react";
import { ProductsList } from "./products-list";

export default function ProductsLayout(props: { children: ReactNode }) {
  return (
    <div>
      <h1>Products</h1>
      <Suspense fallback={<h2>Loading...</h2>}>
        <ProductsList />
      </Suspense>
      {props.children}
    </div>
  );
}
