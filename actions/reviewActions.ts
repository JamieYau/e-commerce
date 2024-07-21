import db from "@/db/db";
import { reviews } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export const getReviews = async (
  productId: string,
  page: number = 1,
  pageSize: number = 10,
) => {
  const offset = (page - 1) * pageSize;

  const reviewsData = await db.query.reviews.findMany({
    where: eq(reviews.productId, productId),
    limit: pageSize,
    offset: offset,
    orderBy: [desc(reviews.createdAt)],
    with: {
      user: {
        columns: {
          name: true,
        },
      },
    },
  });

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(reviews)
    .where(eq(reviews.productId, productId));

  const [{ avgRating }] = await db
    .select({ avgRating: sql<number>`avg(${reviews.rating})` })
    .from(reviews)
    .where(eq(reviews.productId, productId));

  return {
    reviews: reviewsData,
    totalCount: count,
    avgRating: avgRating || 0,
  };
};
