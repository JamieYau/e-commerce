"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddressElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { cn } from "@/lib/utils";
import { saveAddress } from "@/actions/addressActions";

interface DeliveryAddressProps {
  className?: string;
  paymentIntentId: string;
  next: (addressId: string) => void;
  prev: () => void;
}

export default function DeliveryAddress({
  className,
  paymentIntentId,
  next,
  prev,
}: DeliveryAddressProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const updatePaymentIntentWithAddress = async (addressId: string) => {
    try {
      const response = await fetch("/api/update-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId, addressId }),
      });
      const data = await response.json();
      if (data.error) {
        console.error("Error updating PaymentIntent:", data.error);
      }
    } catch (error) {
      console.error("Error updating PaymentIntent:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!stripe || !elements) {
      console.error("Stripe has not loaded");
      setIsSubmitting(false);
      return;
    }

    const addressElement = elements.getElement("address");
    if (addressElement) {
      const { complete, value } = await addressElement.getValue();

      if (complete) {
        try {
          // Save address using the server action
          const address = await saveAddress(value.address);
          await updatePaymentIntentWithAddress(address.id);
          next(address.id); // Move to the next stage
        } catch (error) {
          console.error("Error saving address:", error);
        }
      } else {
        console.error("Please fill out all required address fields.");
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className={cn("", className)}>
      <h1 className="mb-4 text-center text-2xl font-bold">Delivery Address</h1>
      <form onSubmit={handleSubmit} className="m-auto max-w-xl">
        <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: ["GB", "US", "CA"], // Add countries as needed
          }}
        />
        <div className="mt-4 flex justify-between">
          <Button type="button" onClick={prev}>
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Continue to Payment"}
          </Button>
        </div>
      </form>
    </div>
  );
}
