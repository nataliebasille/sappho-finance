import { Suspense } from "react";
import { ProductsList } from "./products-list";

export default function ProductsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="card card-secondary card-ghost mb-2">
        <div className="card-content">
          <Suspense fallback={<span>Loading ...</span>}>
            <ProductsList />
          </Suspense>
        </div>
      </div>
      {children}
    </>
  );
}
