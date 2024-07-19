import db from "@/db/db";
import { products } from "@/db/schema";

export const getProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const result = await db.select().from(products);
  return result;
};
