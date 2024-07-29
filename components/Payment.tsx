import { cn } from "@/lib/utils";
import { PaymentElement } from "@stripe/react-stripe-js";

interface PaymentProps {
  className?: string;
  next: () => void;
  prev: () => void;
}

export default function Payment({ prev, next, className }: PaymentProps) {
  return (
    <div className={cn("", className)}>
      <form>
        <PaymentElement />
      </form>
    </div>
  );
}
