import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import db from "@/db/db";
import { cartItems, products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { cartId } = await request.json();

    // Fetch cart items from the database
    const fetchedCartItems = await db
      .select({
        id: cartItems.id,
        quantity: cartItems.quantity,
        product: {
          id: products.id,
          name: products.name,
          price: products.price,
        },
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.cartId, cartId));

    const amount = fetchedCartItems.reduce(
      (total, item) => total + item.quantity * parseFloat(item.product.price),
      0,
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in cents
      currency: "gbp",
      metadata: { cartId },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
