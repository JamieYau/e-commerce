import db from "@/db/db";
import { products, reviews } from "@/db/schema";
import { eq, notInArray, sql } from "drizzle-orm";

export const getProducts = async () => {
  const result = await db.select().from(products);
  return result;
};

export const getProduct = async (id: string) => {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      category: {
        columns: {
          name: true,
        },
      },
    },
  });

  if (!product) return null;

  // Fetch review summary data
  const [reviewSummary] = await db
    .select({
      avgRating: sql<number>`AVG(${reviews.rating})`,
      totalReviews: sql<number>`COUNT(*)`,
    })
    .from(reviews)
    .where(eq(reviews.productId, id));

  return {
    ...product,
    avgRating: reviewSummary.avgRating || 0,
    totalReviews: reviewSummary.totalReviews || 0,
  };
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
