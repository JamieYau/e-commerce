"use client";

import { ReactNode, useState, useEffect, createContext } from "react";
import { useSession } from "next-auth/react";
import * as cartActions from "@/actions/cartActions";
import { Cart } from "@/types/db";

export interface CartContextType {
  cart: Cart | null;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      cartActions.getOrCreateCart(session.user.id).then(setCart);
    }
  }, [session]);

  const addToCart = async (productId: string, quantity: number) => {
    if (session?.user?.id) {
      const updatedCart = await cartActions.addToCart(
        session.user.id,
        productId,
        quantity,
      );
      setCart(updatedCart);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (session?.user?.id) {
      const updatedCart = await cartActions.removeFromCart(
        session.user.id,
        productId,
      );
      setCart(updatedCart);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (session?.user?.id) {
      const updatedCart = await cartActions.updateCartItemQuantity(
        session.user.id,
        productId,
        quantity,
      );
      setCart(updatedCart);
    }
  };

  const clearCart = async () => {
    if (session?.user?.id) {
      const updatedCart = await cartActions.clearCart(session.user.id);
      setCart(updatedCart);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
