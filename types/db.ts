import { type InferSelectModel } from "drizzle-orm";
import { categories, products } from "@/db/schema";

export type Category = InferSelectModel<typeof categories>;
export type Product = InferSelectModel<typeof products>;
