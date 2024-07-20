import db from "@/db/db";
import { products } from "@/db/schema";

export const getProducts = async () => {
  const result = await db.select().from(products);
  return result;
};
