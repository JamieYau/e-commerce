import db from "@/db/db";
import { categories } from "@/db/schema";

export const getCategories = async () => {
  const data = await db.select().from(categories);

  return data;
};
