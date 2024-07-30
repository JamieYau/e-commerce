"use client";
import { createOrder } from "@/actions/orderActions";
import { useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

interface OrderReviewParams {
  searchParams: {
    amount: string;
    addressId: string;
    payment_intent: string;
    payment_intent_client_secret: string;
  };
}

export default function OrderReview({
  searchParams: {
    amount,
    addressId,
    payment_intent,
    payment_intent_client_secret,
  },
}: OrderReviewParams) {
  const stripe = useStripe();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the PaymentIntent
    stripe
      .retrievePaymentIntent(payment_intent_client_secret)
      .then(({ paymentIntent }) => {
        if (!paymentIntent) throw new Error();
        // Inspect the PaymentIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Success! Payment received.");
            createOrder(payment_intent, addressId);
            break;

          case "processing":
            setMessage(
              "Payment processing. We'll update you when payment is received.",
            );
            break;

          case "requires_payment_method":
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage("Payment failed. Please try another payment method.");
            break;

          default:
            setMessage("Something went wrong.");
            break;
        }
      });
  }, [stripe]);

  return (
    <main className="m-10 mx-auto max-w-6xl rounded-md border p-10 text-center">
      <div className="mb-10">
        <h1 className="mb-2 text-4xl font-extrabold">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>

        <div className="mt-5 p-2 text-4xl font-bold">£{amount}</div>
      </div>
      <span>{message}</span>
    </main>
  );
}
