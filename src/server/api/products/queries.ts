import "server-only";
import { db } from "~/server/db";

export async function getProducts() {
  const products = await db.query.products.findMany({
    with: {
      priceHistory: true,
    },
  });

  return products;
}
