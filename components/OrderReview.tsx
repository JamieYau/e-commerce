"use client";
import { useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

interface OrderReviewParams {
  payment_intent: string;
  payment_intent_client_secret: string;
}

export default function OrderReview({
  payment_intent,
  payment_intent_client_secret,
}: OrderReviewParams) {
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(0);
  const stripe = useStripe();

  useEffect(() => {
    if (!stripe) return;

    // Add stripe promise back and add page back so i can retrieve payment intent on another page.

    stripe
      .retrievePaymentIntent(payment_intent_client_secret)
      .then(({ paymentIntent, error }) => {
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
      });
  }, [payment_intent_client_secret, payment_intent, stripe]);

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
