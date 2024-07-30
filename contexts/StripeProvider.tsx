"use client"
import { createContext, useContext } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
);

const StripeContext = createContext<Promise<Stripe | null>>(stripePromise);

export const useStripePromise = () => useContext(StripeContext);

export const StripeProvider = ({ children }: { children: React.ReactNode }) => (
  <StripeContext.Provider value={stripePromise}>
    {children}
  </StripeContext.Provider>
);
