"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import UserButton from "./UserButton";
import { signIn, useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import CartPreview from "./CartPreview";
import { AspectRatio } from "./ui/aspect-ratio";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";

export default function NavBar() {
  const session = useSession();
  const user = session.data?.user;
   const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="z-10 px-4 py-2 shadow-sm">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        {/* Logo  */}
        <div className="flex items-center">
          <Link href="/" className="hidden w-40 md:block">
            <AspectRatio ratio={5 / 1}>
              <Image
                src="/images/logo-black.png"
                alt="techwave"
                fill
                priority
                className="object-fill"
                sizes="160px"
              />
            </AspectRatio>
          </Link>
          <Link href="/" className="w-10 md:hidden">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={"/favicons/android-chrome-512x512.png"}
                alt="icon"
                fill
              />
            </AspectRatio>
          </Link>
        </div>
        {/* Nav Links  */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-4 md:flex">
            <Link href={"/"}>Home</Link>
            <Link href={"/products"}>Shop</Link>
            <CartPreview />
          </div>
          <BurgerMenu />
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
