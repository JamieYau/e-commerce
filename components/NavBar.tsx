"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import UserButton from "./UserButton";
import { signIn, useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";

export default function NavBar() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <header className="shadow-sm z-10">
      <nav className="flex w-full max-w-7xl items-center justify-between gap-3 mx-auto h-14">
        <Link href="/">E-Commerce</Link>
        {user && <UserButton user={user} />}
        {session.status === "loading" && (
          <Skeleton className="rounded-full h-10 w-10" />
        )}
        {!user && session.status !== "loading" && <SignInButton />}
      </nav>
    </header>
  );
}

function SignInButton() {
  return <Button onClick={() => signIn()}>Sign in</Button>;
}
