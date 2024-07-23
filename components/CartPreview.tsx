import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import useCart from "@/contexts/useCart";

export default function CartPreview() {
  const { items, removeFromCart, updateQuantity } = useCart();
  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const subtotal = items.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0,
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative p-2">
          <ShoppingCart className="h-6 w-6" />
          {cartItemsCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 min-w-[22px] justify-center p-[2px]"
            >
              {cartItemsCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-sm text-gray-500">
                  £{item.product.price} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <p className="text-lg font-semibold">
            Subtotal: £{subtotal.toFixed(2)}
          </p>
        </div>
        <div className="mt-6">
          <Link href="/checkout" passHref>
            <Button className="w-full">Continue to Checkout</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
