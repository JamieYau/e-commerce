"use client";
import DeliveryAddress from "@/components/DeliveryAddress";
import OrderReview from "@/components/OrderReview";
import Payment from "@/components/Payment";
import ProgressBar from "@/components/ProgressBar";
import ReviewCart from "@/components/ReviewCart";
import { useStripePromise } from "@/contexts/StripeProvider";
import useCart from "@/contexts/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export default function Page() {
  const [currentStage, setCurrentStage] = useState(0);
  const { cart } = useCart();
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(0);
  const [addressId, setAddressId] = useState<string | null>(null);
  const [paymentIntent, setPaymentIntent] = useState(""); // State to store paymentIntent
  const stripePromise = useStripePromise();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (cart && cart.cartItems.length !== 0) {
      fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId: cart.id }),
      })
        .then((res) => res.json())
        .then(
          (data) => {
            if (!data.message) {
              setClientSecret(data.clientSecret);
              setAmount(data.amount);
              setPaymentIntent(data.paymentIntentId);
            } else {
              console.log(data.message);
            }
          }, // Assuming your API returns the amount
        );
    }
  }, [cart]);

  const updatePaymentIntentWithAddress = async (addressId: string) => {
    try {
      const response = await fetch("/api/update-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId: paymentIntent, addressId }),
      });
      const data = await response.json();
      if (data.error) {
        console.error("Error updating PaymentIntent:", data.error);
      }
    } catch (error) {
      console.error("Error updating PaymentIntent:", error);
    }
  };

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
                  next={async (addressId) => {
                    setAddressId(addressId);
                    await updatePaymentIntentWithAddress(addressId);
                    setCurrentStage(2);
                  }}
                  prev={() => setCurrentStage(0)}
                />
                <Payment
                  className={currentStage === 2 ? "block" : "hidden"}
                  next={(intent: string) => {
                    setPaymentIntent(intent);
                    setCurrentStage(3);
                  }}
                  prev={() => setCurrentStage(1)}
                  clientSecret={clientSecret}
                  amount={amount}
                  addressId={addressId}
                />
                {currentStage === 3 && (
                  <OrderReview
                    addressId={addressId || ""}
                    payment_intent={paymentIntent}
                    payment_intent_client_secret={clientSecret}
                  />
                )}
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
