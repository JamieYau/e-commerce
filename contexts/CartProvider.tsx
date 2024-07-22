"use client";

import { ReactNode, useState, useEffect, createContext } from "react";
import { useSession } from "next-auth/react";
import * as cartActions from "@/actions/cartActions";
import { CartItem } from "@/types/db";
import { CartContextType } from "@/types/cart";

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      cartActions.getOrCreateCart(session.user.id).then((cart) => {
        setItems(cart.cartItems);
      });
    }
  }, [session]);

  const addToCart = async (productId: string, quantity: number) => {
    if (session?.user?.id) {
      const updatedCart = await cartActions.addToCart(
        session.user.id,
        productId,
        quantity,
      );
      setItems(updatedCart.cartItems);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (session?.user?.id) {
      const updatedCart = await cartActions.removeFromCart(
        session.user.id,
        productId,
      );
      setItems(updatedCart.cartItems);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (session?.user?.id) {
      const updatedCart = await cartActions.updateCartItemQuantity(
        session.user.id,
        productId,
        quantity,
      );
      setItems(updatedCart.cartItems);
    }
  };

  const clearCart = async () => {
    if (session?.user?.id) {
      const updatedCart = await cartActions.clearCart(session.user.id);
      setItems(updatedCart.cartItems);
    }
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
