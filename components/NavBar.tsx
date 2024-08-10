"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import UserButton from "./UserButton";
import { signIn, useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import CartPreview from "./CartPreview";
import { AspectRatio } from "./ui/aspect-ratio";

export default function NavBar() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <header className="z-10 px-4 py-2 shadow-sm">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        <div className="flex items-end gap-12">
          <Link href="/" className="w-40">
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
        </div>
        <div className="flex items-center gap-4">
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>Shop</Link>
          <CartPreview />
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
