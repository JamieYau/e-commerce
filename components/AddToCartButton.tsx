"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Check } from "lucide-react";
import useCart from "@/contexts/useCart";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
}

export default function AddToCartButton({
  productId,
  productName,
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(productId, 1);
      toast({
        title: "Added to cart",
        description: `${productName} has been added to your cart.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="w-44 transition-all duration-200 ease-in-out"
    >
      {isAdding ? (
        <Check className="mr-2 h-4 w-4 animate-bounce" />
      ) : (
        <ShoppingCart className="mr-2 h-4 w-4" />
      )}
      {isAdding ? "Added!" : "Add to Cart"}
    </Button>
  );
}
