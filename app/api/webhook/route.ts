import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createOrder } from "@/actions/orderActions";
import { stripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Error verifying webhook signature: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    );
  }

  // Handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);

    // Retrieve the address & cart ID from metadata
    const addressId = paymentIntent.metadata.addressId;
    const cartId = paymentIntent.metadata.cartId;

    if (!addressId || !cartId) {
      console.error("Missing addressId or cartId in payment intent metadata");
      return NextResponse.json(
        { error: "Missing required metadata" },
        { status: 400 },
      );
    }

    try {
      await createOrder(paymentIntent.id, addressId);
      console.log("Order created successfully");
    } catch (error) {
      console.error("Error creating order:", error);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
}
