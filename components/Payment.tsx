import { cn } from "@/lib/utils";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { useState } from "react";
import { createOrder } from "@/actions/orderActions";

interface PaymentProps {
  className?: string;
  next: (intent: string) => void;
  prev: () => void;
  clientSecret: string;
  amount: number;
  addressId: string | null; // Ensure addressId can be null initially
}

export default function Payment({
  prev,
  next,
  className,
  clientSecret,
  amount,
  addressId,
}: PaymentProps) {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!stripe || !elements || !addressId) {
      console.error("Stripe has not loaded");
      setIsSubmitting(false);
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setIsSubmitting(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}/checkout`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      next(paymentIntent.id);
    }

    setIsSubmitting(false);
  };

  return (
    <div className={cn("", className)}>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        {errorMessage && <div>{errorMessage}</div>}
        <div className="mt-4 flex justify-between">
          <Button type="button" onClick={prev}>
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Submitting..."
              : `Pay £${(amount / 100).toFixed(2)}`}
          </Button>
        </div>
      </form>
    </div>
  );
}
