import { type InferSelectModel } from "drizzle-orm";
import { cartItems, carts, categories, products } from "@/db/schema";

export type Category = InferSelectModel<typeof categories>;
export type Product = InferSelectModel<typeof products>;
export type CartItemBase = InferSelectModel<typeof cartItems>;
export type CartBase = InferSelectModel<typeof carts>;

export type CartItem = CartItemBase & {
  product: Product;
};
export type Cart = CartBase & {
  cartItems: CartItem[];
};
