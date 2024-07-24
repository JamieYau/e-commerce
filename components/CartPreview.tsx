import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import useCart from "@/contexts/useCart";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { cartSummary } from "@/lib/utils";

export default function CartPreview() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  // Accessing cart cartItems
  const cartItems = cart?.cartItems || [];
  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const subtotal = cartItems.reduce(
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
      <SheetContent className="sm:min-w-[450px]">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription className="hidden">
            Preview your cart here. Click checkout button when you&apos;re ready
            to purchase.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="grid grid-cols-10 grid-rows-3">
              <figure className="col-span-3 row-span-3">
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
              <div className="col-span-5 row-span-2 ml-2">
                <p className="font-semibold">{item.product.name}</p>
              </div>
              <div className="col-span-2 row-span-2 flex items-start justify-end">
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-auto h-4 w-4 p-0"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="col-span-7 flex justify-between">
                <p className="ml-2 inline-flex items-end text-sm font-bold">
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
        <div className="mt-6 flex justify-between">
          <div className="flex gap-1">
            <span className="text-lg font-semibold">Subtotal</span>
            <span className="inline-flex items-center text-sm">{cartSummary(cartItems.length)}</span>
          </div>
          <p>£{subtotal.toFixed(2)}</p>
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
