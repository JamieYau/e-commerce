"use server";

import db from "@/db/db";
import { products, reviews } from "@/db/schema";
import { and, eq, inArray, notInArray, sql } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

interface Filters {
  categories?: string[];
  minPrice?: string;
  maxPrice?: string;
}

const numericGte = (column: PgColumn, value: string | undefined) =>
  value ? sql`CAST(${column} AS numeric) >= ${parseFloat(value)}` : undefined;

const numericLte = (column: PgColumn, value: string | undefined) =>
  value ? sql`CAST(${column} AS numeric) <= ${parseFloat(value)}` : undefined;

export const getProducts = async (filters: Filters = {}) => {
  const { categories, minPrice, maxPrice } = filters;
  const whereClauses = [];

  if (categories && categories.length > 0) {
    whereClauses.push(inArray(products.categoryId, categories));
  }

  const minPriceClause = numericGte(products.price, minPrice);
  if (minPriceClause) whereClauses.push(minPriceClause);

  const maxPriceClause = numericLte(products.price, maxPrice);
  if (maxPriceClause) whereClauses.push(maxPriceClause);

  const result = await db
    .select()
    .from(products)
    .where(and(...whereClauses));

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
