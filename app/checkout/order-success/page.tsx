"use client";

import { useStripePromise } from "@/contexts/StripeProvider";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrderId } from "@/actions/orderActions";
import { buttonVariants } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";

interface OrderSuccessParams {
  searchParams: {
    payment_intent: string;
    payment_intent_client_secret: string;
  };
}

export default function OrderSuccessPage({
  searchParams: { payment_intent, payment_intent_client_secret },
}: OrderSuccessParams) {
  const stripePromise = useStripePromise();
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(0);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      if (!stripe) return;
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
            try {
              const orderId = await getOrderId(paymentIntent.id);
              setOrderId(orderId);
            } catch (error) {
              if (error instanceof Error) {
                setMessage(error.message);
              }
            }
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
  }, [stripePromise, payment_intent_client_secret]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-2 sm:px-8">
      <ProgressBar currentStage={3} />
      <section>
        <h1>Order Success</h1>
        <div>{message}</div>
        <div>Amount: £{(amount / 100).toFixed(2)}</div>
        {orderId ? (
          <Link
            className={buttonVariants({ variant: "default" })}
            href={`/order/${orderId}`}
          >
            View Order
          </Link>
        ) : (
          <div>Loading order details...</div>
        )}
      </section>
    </div>
  );
}
