"use client";

import { useStripePromise } from "@/contexts/StripeProvider";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrderId } from "@/actions/orderActions";
import { buttonVariants } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import { Check } from "lucide-react";

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
            setMessage("Success! Order Placed.");
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
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 p-2 sm:px-8">
      <ProgressBar currentStage={3} />
      <section className="m-auto">
        <div className="relative flex flex-col items-center gap-4 rounded-md border p-4">
          <div className="absolute -top-6 bg-green-400 rounded-full">
            <Check className="h-12 w-12 stroke-white" />
          </div>
          <h1 className="text-2xl font-bold mt-4">{message}</h1>
          <p className="font-semibold">£{(amount / 100).toFixed(2)}</p>
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
        </div>
      </section>
    </div>
  );
}
