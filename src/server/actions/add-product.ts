"use server";

import "server-only";
import { z } from "zod";
import { createFormAction } from "../forms";

const addProductSchema = z.object({
  name: z.string(),
  price: z.number(),
});

export const addProduct = createFormAction(addProductSchema, async (input) => {
  console.log(input);
});
