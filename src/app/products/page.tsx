import { LoadingIndicator } from "../_components/loading-indicator";
import { Suspense } from "react";
import { ProductsList } from "./products-list";
import { AddProductForm } from "./add-product-form";
import { PageContainer } from "../_components/page-container";

export default function ProductsPage() {
  return (
    <PageContainer>
      <div className="card card-secondary card-ghost mb-2">
        <div className="card-header">
          <h3 className="card-title font-bold">Products</h3>
        </div>
        <div className="card-content">
          <Suspense fallback={<LoadingIndicator />}>
            <ProductsList />
          </Suspense>

          <div className="divider divider-accent">Add add product</div>

          <AddProductForm />
        </div>
      </div>
    </PageContainer>
  );
}
