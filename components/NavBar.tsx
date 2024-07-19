"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import UserButton from "./UserButton";
import { signIn, useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";

export default function NavBar() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <header className="z-10 py-2 px-4 shadow-sm">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        <Link href="/">
          <Image
            src="/images/logo-black.png"
            alt="techwave"
            width={200}
            height={39}
            priority
          />
        </Link>
        {user && <UserButton user={user} />}
        {session.status === "loading" && (
          <Skeleton className="h-10 w-10 rounded-full" />
        )}
        {!user && session.status !== "loading" && <SignInButton />}
      </nav>
    </header>
  );
}

function SignInButton() {
  return <Button onClick={() => signIn()}>Sign in</Button>;
}
