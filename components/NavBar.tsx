"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import UserButton from "./UserButton";
import { signIn, useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import CartPreview from "./CartPreview";
import { AspectRatio } from "./ui/aspect-ratio";
import BurgerMenu from "./BurgerMenu";
import React, { Suspense, useState } from "react";
import { Search } from "lucide-react";
import SearchBar from "./SearchBar";

export default function NavBar() {
  const session = useSession();
  const user = session.data?.user;

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <header className="relative z-20 px-4 py-2 shadow-sm">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center">
          {/* Desktop */}
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
          {/* Mobile  */}
          <Link href="/" className="w-10 md:hidden">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={"/favicons/android-chrome-512x512.png"}
                alt="icon"
                fill
                sizes="40px"
              />
            </AspectRatio>
          </Link>
        </div>
        {/* SearchBar */}
        <Suspense>
          <SearchBar
            setIsSearchVisible={setIsSearchVisible}
            isVisible={isSearchVisible}
          />
        </Suspense>
        {/* Nav Links */}
        <div className="flex items-center gap-4">
          {/* Desktop */}
          <div className="hidden items-center gap-4 md:flex">
            <Link href={"/"}>Home</Link>
            <Link href={"/products"}>Shop</Link>
          </div>
          {/* Desktop & Mobile */}
          <div>
            <Button
              variant={"ghost"}
              className="p-2 sm:hidden"
              onClick={() => setIsSearchVisible(true)}
              aria-label="Open search"
            >
              <Search />
            </Button>
            <BurgerMenu />
            {user && <CartPreview />}
          </div>
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
