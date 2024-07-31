"use client";
import { useStripePromise } from "@/contexts/StripeProvider";
import { useEffect, useState } from "react";

interface OrderReviewParams {
  addressId: string;
  payment_intent: string;
  payment_intent_client_secret: string;
}

export default function OrderReview({
  addressId,
  payment_intent,
  payment_intent_client_secret,
}: OrderReviewParams) {
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(0);
  const stripePromise = useStripePromise(); // Use the shared stripePromise

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      if (!stripe) return;

      try {
        const { error, paymentIntent } = await stripe.retrievePaymentIntent(
          payment_intent_client_secret,
        );

        if (error && error.message) {
          setMessage(error.message);
        } else if (paymentIntent) {
          setAmount(paymentIntent.amount);
          switch (paymentIntent.status) {
            case "succeeded":
              setMessage("Success! Payment received.");
              break;
              
            case "processing":
              setMessage(
                "Payment processing. We'll update you when payment is received.",
              );
              break;

            case "requires_payment_method":
              setMessage("Payment failed. Please try another payment method.");
              break;

            default:
              setMessage("Something went wrong.");
              break;
          }
        }
      } catch (error) {
        console.error("Failed to retrieve payment intent:", error);
        setMessage("Failed to retrieve payment intent.");
      }
    });
  }, [stripePromise, payment_intent_client_secret, payment_intent, addressId]);

  return (
    <main className="m-10 mx-auto max-w-6xl rounded-md border p-10 text-center">
      <div className="mb-10">
        <h1 className="mb-2 text-4xl font-extrabold">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>
        <div className="mt-5 p-2 text-4xl font-bold">
          £{(amount / 100).toFixed(2)}
        </div>
      </div>
      <span>{message}</span>
    </main>
  );
}
