import db from "@/db/db";
import { products } from "@/db/schema";
import { eq, notInArray, sql } from "drizzle-orm";

export const getProducts = async () => {
  const result = await db.select().from(products);
  return result;
};

export const getProduct = async (id: string) => {
  const result = await db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      category: {
        columns: {
          name: true,
        },
      },
    },
  });
  return result;
};

export const getRecommendedProducts = async (
  currentProductId: string,
  limit: number = 4,
) => {
  const recommendedProducts = await db.query.products.findMany({
    where: notInArray(products.id, [currentProductId]),
    limit: limit,
    orderBy: sql`RANDOM()`,
  });

  return recommendedProducts;
};
