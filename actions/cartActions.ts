"use server"

import db from "@/db/db";
import { carts, cartItems } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function getOrCreateCart(userId: string) {
  let cart = await db.query.carts.findFirst({
    where: eq(carts.userId, userId),
    with: {
      cartItems: {
        with: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    const [newCart] = await db.insert(carts).values({ userId }).returning();
    cart = { ...newCart, cartItems: [] };
  }

  return cart;
}

export async function addToCart(
  userId: string,
  productId: string,
  quantity: number,
) {
  const cart = await getOrCreateCart(userId);

  const existingItem = cart.cartItems.find(
    (item) => item.productId === productId,
  );

  if (existingItem) {
    await db
      .update(cartItems)
      .set({ quantity: existingItem.quantity + quantity })
      .where(
        and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, productId)),
      );
  } else {
    await db.insert(cartItems).values({
      cartId: cart.id,
      productId,
      quantity,
    });
  }

  return getOrCreateCart(userId);
}

export async function removeFromCart(userId: string, productId: string) {
  const cart = await getOrCreateCart(userId);

  await db
    .delete(cartItems)
    .where(
      and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, productId)),
    );

  return getOrCreateCart(userId);
}

export async function updateCartItemQuantity(
  userId: string,
  productId: string,
  quantity: number,
) {
  const cart = await getOrCreateCart(userId);

  await db
    .update(cartItems)
    .set({ quantity })
    .where(
      and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, productId)),
    );

  return getOrCreateCart(userId);
}

export async function clearCart(userId: string) {
  const cart = await getOrCreateCart(userId);

  await db.delete(cartItems).where(eq(cartItems.cartId, cart.id));

  return getOrCreateCart(userId);
}
