"use server";

import { auth } from "@/auth";
import db from "@/db/db";
import { orders, orderItems, carts, cartItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { stripe } from "@/lib/stripe";

export async function createOrder(paymentIntentId: string, addressId: string) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  // Retrieve the Stripe payment intent
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status !== "succeeded") {
    throw new Error("Payment not completed");
  }

  // Retrieve the user's cart
  const userCart = await db.query.carts.findFirst({
    where: eq(carts.userId, userId),
  });

  if (!userCart) {
    throw new Error("Cart not found");
  }

  // Retrieve the cart items
  const cartItemsList = await db.query.cartItems.findMany({
    where: eq(cartItems.cartId, userCart.id),
    with: {
      product: true,
    },
  });

  if (cartItemsList.length === 0) {
    throw new Error("Cart is empty");
  }

  // Create the order
  const [order] = await db
    .insert(orders)
    .values({
      userId,
      status: "processing",
      shippingAddressId: addressId,
      stripePaymentIntentId: paymentIntentId,
    })
    .returning();

  // Create order items
  const orderItemsData = cartItemsList.map((item) => ({
    orderId: order.id,
    productId: item.productId,
    quantity: item.quantity,
    price: item.product.price,
  }));

  await db.insert(orderItems).values(orderItemsData);

  // Clear the user's cart
  await db.delete(cartItems).where(eq(cartItems.cartId, userCart.id));
  await db.delete(carts).where(eq(carts.id, userCart.id));

  return order;
}
