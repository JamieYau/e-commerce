import { type InferSelectModel } from "drizzle-orm";
import { cartItems, carts, categories, products, addresses } from "@/db/schema";

export type Category = InferSelectModel<typeof categories>;
export type Product = InferSelectModel<typeof products>;
export type CartItemBase = InferSelectModel<typeof cartItems>;
export type CartBase = InferSelectModel<typeof carts>;
export type Address = InferSelectModel<typeof addresses>;

export type AddressFormData = Omit<
  Address,
  "id" | "userId" | "isDefault" | "createdAt" | "updatedAt"
>;

export type CartItem = CartItemBase & {
  product: Product;
};
export type Cart = CartBase & {
  cartItems: CartItem[];
};
