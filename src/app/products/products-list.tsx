import { getProducts } from "~/server/api/products/queries";
import { db } from "~/server/db";

export async function ProductsList() {
  const products = await getProducts();

  return products.length ? (
    <div className="list">
      {products.map((product) => (
        <div key={product.id} className="list-item">
          <div className="list-item-content">
            <div className="list-item-title">{product.name}</div>
            <div className="list-item-subtitle">
              {product.priceHistory[0].price / 100}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <i className="block text-center">You have no products</i>
  );
}
