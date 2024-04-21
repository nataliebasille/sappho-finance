"use server";

import "server-only";
import { z } from "zod";
import { createFormAction } from "../../forms";
import { db } from "../../db";
import { productPrices, products } from "../../db/schema";

const addProductSchema = z.object({
  name: z.string(),
  price: z.number(),
});

export const addProduct = createFormAction(addProductSchema, async (input) => {
  const { id } = (
    await db
      .insert(products)
      .values({
        name: input.name,
        createdAt: new Date(),
      })
      .returning()
  )[0];

  await db.insert(productPrices).values({
    productId: id,
    price: input.price * 100,
    createdAt: new Date(),
    activeOn: new Date(),
  });
});
