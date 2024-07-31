import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const { paymentIntentId, addressId } = await request.json();

    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      metadata: { addressId },
    });

    return NextResponse.json({
      updated: true,
      paymentIntent: paymentIntent.id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
