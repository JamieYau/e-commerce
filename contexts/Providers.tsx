import { SessionProvider } from "next-auth/react";
import CartProvider from "./CartProvider";
import { ReactNode } from "react";
import { StripeProvider } from "./StripeProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <StripeProvider>{children}</StripeProvider>
      </CartProvider>
    </SessionProvider>
  );
}
