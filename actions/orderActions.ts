"use server";

import db from "@/db/db";
import { orders, orderItems, carts, cartItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { stripe } from "@/lib/stripe";

export async function createOrder(paymentIntentId: string, addressId: string) {
  // Retrieve the Stripe payment intent
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status !== "succeeded") {
    throw new Error("Payment not completed");
  }

  // Retrieve the user's cart based on the metadata in the payment intent
  const cartId = paymentIntent.metadata.cartId;
  if (!cartId) {
    throw new Error("Cart ID not found in payment intent metadata");
  }

  const userCart = await db.query.carts.findFirst({
    where: eq(carts.id, cartId),
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
      userId: userCart.userId,
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

export async function getOrderId(paymentIntentId: string) {
  const order = await db.query.orders.findFirst({
    where: eq(orders.stripePaymentIntentId, paymentIntentId),
    columns: {
      id: true,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order.id;
}

export async function getOrders(userId: string) {
  const userOrders = await db.query.orders.findMany({
    where: eq(orders.userId, userId),
    with: {
      orderItems: true,
    },
  });

  if (!userOrders) {
    throw new Error("Orders not found");
  }

  // Calculate totalAmount for each order
  const ordersWithTotalAmount = userOrders.map((order) => {
    const totalAmount = order.orderItems.reduce((sum, item) => {
      return sum + parseFloat(item.price) * item.quantity;
    }, 0);
    return {
      ...order,
      totalAmount,
    };
  });

  return ordersWithTotalAmount;
}

export async function getOrder(orderId: string) {
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: {
      orderItems: {
        with: { product: true },
      },
      shippingAddress: {
        columns: {
          line1: true,
          line2: true,
          city: true,
          country: true,
          postal_code: true,
        },
      },
    },
  });

  if (!order) {
    throw new Error(`No order with id: ${orderId}`);
  }

  const totalAmount = order.orderItems.reduce((sum, item) => {
    return sum + parseFloat(item.price) * item.quantity;
  }, 0);

  return { ...order, totalAmount };
}
