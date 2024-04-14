import { db } from "~/server/db";

export async function ProductsList() {
  const products = await db.query.products.findMany({
    with: {
      priceHistory: true,
    },
  });

  return products.length ? (
    <>{products.length}</>
  ) : (
    <i className="block text-center">You have no products</i>
  );
}
