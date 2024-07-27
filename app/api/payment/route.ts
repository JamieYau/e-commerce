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
          stripePriceId: products.stripePriceId,
        },
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.cartId, cartId));

    const line_items = fetchedCartItems
      .map((item) => ({
        price: item.product.stripePriceId,
        quantity: item.quantity,
      }))
      .filter((item) => item.price !== null) as {
      price: string;
      quantity: number;
    }[];

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items,
      mode: "payment",
      return_url: `${request.headers.get(
        "origin",
      )}/payment-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
