import db from "@/db/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getProducts = async () => {
  const result = await db.select().from(products);
  return result;
};

export const getProduct = async (id: string) => {
  const result = await db.query.products.findFirst({
    where: eq(products.id, id),
  });
  return result;
};
