"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import UserButton from "./UserButton";
import { signIn, useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import useCart from "@/contexts/useCart";
import { ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";

export default function NavBar() {
  const session = useSession();
  const user = session.data?.user;
  const { items } = useCart();

  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <header className="z-10 px-4 py-2 shadow-sm">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        <Link href="/">
          <Image
            src="/images/logo-black.png"
            alt="techwave"
            width={150}
            height={30}
            priority
          />
        </Link>
        <div className="flex items-center gap-4">
          <CartButton itemsCount={cartItemsCount} />
          {user && <UserButton user={user} />}
          {session.status === "loading" && (
            <Skeleton className="h-10 w-10 rounded-full" />
          )}
          {!user && session.status !== "loading" && <SignInButton />}
        </div>
      </nav>
    </header>
  );
}

function SignInButton() {
  return <Button onClick={() => signIn()}>Sign in</Button>;
}

function CartButton({ itemsCount }: { itemsCount: number }) {
  return (
    <Link href="/cart">
      <Button variant="ghost" className="relative p-2">
        <ShoppingCart className="h-6 w-6" />
        {itemsCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -right-1 -top-1 p-[2px] min-w-[22px] justify-center"
          >
            {itemsCount}
          </Badge>
        )}
      </Button>
    </Link>
  );
}
