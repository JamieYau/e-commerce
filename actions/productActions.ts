"use server";

import db from "@/db/db";
import { products, reviews } from "@/db/schema";
import {
  and,
  asc,
  avg,
  count,
  desc,
  eq,
  gte,
  ilike,
  inArray,
  lte,
  notInArray,
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
    // case "rating":
    //   // Join with the reviews table to sort by the average rating
    //   return desc(avg(reviews.rating));
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
  // .leftJoin(reviews, eq(products.id, reviews.productId))
  // .groupBy(products.id)
  const condition = and(
    q ? ilike(products.name, `%${q}%`) : undefined,
    categories && categories.length > 0
      ? inArray(products.categoryId, categories)
      : undefined,
    minPrice ? gte(products.price, minPrice) : undefined,
    maxPrice ? lte(products.price, maxPrice) : undefined,
  );

  const productList = await db.query.products.findMany({
    where: condition,
    orderBy: getSort(sort),
    limit: limit,
    offset: (page - 1) * limit,
  });

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
  const recommendedProducts = await db.query.products.findMany({
    where: notInArray(products.id, [currentProductId]),
    limit: limit,
    orderBy: sql`RANDOM()`,
  });

  return recommendedProducts;
};
