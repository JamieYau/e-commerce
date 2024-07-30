import { cn } from "@/lib/utils";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { useState } from "react";

interface PaymentProps {
  className?: string;
  next: () => void;
  prev: () => void;
  clientSecret: string;
  amount: number;
}

export default function Payment({
  prev,
  next,
  className,
  clientSecret,
  amount,
}: PaymentProps) {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!stripe || !elements) {
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

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
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
