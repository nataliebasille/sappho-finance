import { Suspense } from "react";
import { ProductsList } from "./products-list";
import { LoadingIndicator } from "../_components/loading-indicator";

export default function ProductsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="card card-secondary card-ghost mb-2">
        <div className="card-content">
          <Suspense fallback={<LoadingIndicator />}>
            <ProductsList />
          </Suspense>
        </div>
      </div>
      {children}
    </>
  );
}
