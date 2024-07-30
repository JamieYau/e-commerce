"use client";
import DeliveryAddress from "@/components/DeliveryAddress";
import Payment from "@/components/Payment";
import ProgressBar from "@/components/ProgressBar";
import ReviewCart from "@/components/ReviewCart";
import useCart from "@/contexts/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
);

export default function Page() {
  const [currentStage, setCurrentStage] = useState(0);
  const { cart } = useCart();
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (cart) {
      fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId: cart.id }),
      })
        .then((res) => res.json())
        .then(
          (data) => {
            setClientSecret(data.clientSecret);
            setAmount(data.amount);
          }, // Assuming your API returns the amount
        );
    }
  }, [cart]);

  const options = {
    clientSecret,
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-2 sm:px-8">
      <ProgressBar currentStage={currentStage} />
      <section>
        {clientSecret ? (
          <>
            {currentStage === 0 ? (
              <ReviewCart next={() => setCurrentStage(1)} />
            ) : (
              <Elements stripe={stripePromise} options={options}>
                <DeliveryAddress
                  className={currentStage === 1 ? "block" : "hidden"}
                  next={() => setCurrentStage(2)}
                  prev={() => setCurrentStage(0)}
                />
                <Payment
                  className={currentStage === 2 ? "block" : "hidden"}
                  next={() => setCurrentStage(3)}
                  prev={() => setCurrentStage(1)}
                  clientSecret={clientSecret}
                  amount={amount}
                />
              </Elements>
            )}
          </>
        ) : (
          <div>Loading payment details...</div>
        )}
      </section>
    </div>
  );
}
