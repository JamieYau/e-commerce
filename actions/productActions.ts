"use server";

import db from "@/db/db";
import { products, reviews } from "@/db/schema";
import {
  and,
  asc,
  count,
  desc,
  eq,
  getTableColumns,
  gte,
  ilike,
  inArray,
  lte,
  sql,
} from "drizzle-orm";

interface Filters {
  q?: string;
  sort?: string;
  categories?: string[];
  minPrice?: string;
  maxPrice?: string;
  page?: number;
  limit?: number;
}

function getSort(sort: Filters["sort"]) {
  switch (sort) {
    case "price-asc":
      return asc(products.price);
    case "price-desc":
      return desc(products.price);
    case "newest":
      return desc(products.createdAt);
    case "rating":
      return desc(sql`avg_rating`);
    default:
      return desc(products.createdAt);
  }
}

export const getProducts = async ({
  q,
  sort,
  categories,
  minPrice,
  maxPrice,
  page = 1,
  limit = 9,
}: Filters) => {
  const condition = and(
    q ? ilike(products.name, `%${q}%`) : undefined,
    categories && categories.length > 0
      ? inArray(products.categoryId, categories)
      : undefined,
    minPrice ? gte(products.price, minPrice) : undefined,
    maxPrice ? lte(products.price, maxPrice) : undefined,
  );
  const productColumns = getTableColumns(products);

  const productList = await db
    .select({
      ...productColumns,
      avgRating: sql<number>`COALESCE(AVG(${reviews.rating}), 0)`.as(
        "avg_rating",
      ),
      reviewCount: count(reviews.id).as("review_count"),
    })
    .from(products)
    .leftJoin(reviews, eq(reviews.productId, products.id))
    .where(condition)
    .groupBy(products.id)
    .orderBy(getSort(sort))
    .limit(limit)
    .offset((page - 1) * limit);

  const [total] = await db
    .select({
      count: count(),
    })
    .from(products)
    .where(condition);

  return { productList, total: total.count, limit };
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
  const productColumns = getTableColumns(products);

  const recommendedProducts = await db
    .select({
      ...productColumns,
      avgRating: sql<number>`AVG(${reviews.rating})`.as("avg_rating"),
      reviewCount: sql<number>`COUNT(${reviews.id})`.as("review_count"),
    })
    .from(products)
    .leftJoin(reviews, sql`${products.id} = ${reviews.productId}`)
    .where(sql`${products.id} != ${currentProductId}`)
    .groupBy(products.id)
    .orderBy(sql`RANDOM()`)
    .limit(limit);

  return recommendedProducts;
};
