import { type InferSelectModel } from "drizzle-orm";
import { cartItems, categories, products } from "@/db/schema";

export type Category = InferSelectModel<typeof categories>;
export type Product = InferSelectModel<typeof products>;
export type CartItemBase = InferSelectModel<typeof cartItems>;

// Extend the CartItem type to include the Product
export type CartItem = CartItemBase & {
  product: Product;
};
