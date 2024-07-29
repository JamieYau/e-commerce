import useCart from "@/contexts/useCart";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { CartItem } from "@/types/db";
import { cartSummary, cn } from "@/lib/utils";

interface ReviewCartProps {
  className?: string;
  next: () => void;
}

export default function ReviewCart({ className, next }: ReviewCartProps) {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { toast } = useToast();

  // Accessing cart cartItems
  const cartItems = cart?.cartItems || [];
  const subtotal = cartItems.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0,
  );

  const handleRemoveFromCart = async (item: CartItem) => {
    try {
      await removeFromCart(item.id);
      toast({
        title: "Removed from cart",
        description: `${item.product.name} has been removed from your cart.`,
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from your cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h2 className="text-xl font-semibold">Review Your Cart</h2>
      {cart && (
        <>
          <div className="flex flex-col gap-4 rounded-sm sm:gap-0 sm:border">
            {cart.cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-10 grid-rows-3 sm:grid-rows-1 sm:p-2 sm:[&:not(:last-child)]:border-b"
              >
                <figure className="col-span-3 row-span-3 sm:col-span-1 sm:row-span-1">
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={item.product.imageUrl || "/images/placeholder.png"}
                      alt={`${item.product.name} Image`}
                      fill
                      className="object-cover"
                      sizes="120.3px"
                    />
                  </AspectRatio>
                </figure>
                <div className="col-span-5 row-span-2 ml-2 sm:row-span-1 sm:my-auto">
                  <p className="font-semibold">{item.product.name}</p>
                </div>
                <div className="col-span-2 row-span-2 flex items-start justify-end sm:col-span-1 sm:row-span-1 sm:items-center sm:justify-center">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-4 w-4 p-0 sm:h-6 sm:w-6"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    <Trash2 className="h-4 w-4 sm:h-6 sm:w-6" />
                  </Button>
                </div>
                <div className="col-span-7 flex justify-between sm:col-span-3 sm:col-start-7 sm:row-start-1 sm:flex-row-reverse sm:items-center">
                  <p className="ml-2 inline-flex items-end text-sm font-bold sm:ml-0">
                    £{item.product.price}
                  </p>
                  <div className="my-auto rounded-md border">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-7 w-8 rounded-r-none"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="inline-flex items-center px-3 text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-7 w-8 rounded-l-none"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="ml-auto flex w-full flex-col gap-4 rounded-md sm:w-80 sm:border sm:bg-muted sm:p-4">
            <div className="flex justify-between">
              <div className="flex gap-1">
                <span className="text-lg font-semibold">Subtotal</span>
                <span className="inline-flex items-center text-sm">
                  {cartSummary(cartItems.length)}
                </span>
              </div>
              <p>£{subtotal.toFixed(2)}</p>
            </div>
            <Button onClick={next}>Continue to Delivery Address</Button>
          </div>
        </>
      )}
    </div>
  );
}
