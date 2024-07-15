import { signIn } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/button";
import UserButton from "./UserButton";
import getSession from "@/lib/getSession";

export default async function NavBar() {
  const session = await getSession();
  const user = session?.user;
  return (
    <header className="shadow-sm z-10">
      <nav className="flex w-full max-w-7xl items-center justify-between gap-3 mx-auto h-14">
        <Link href="/">E-Commerce</Link>
        {user ? <UserButton user={user} /> : <SignInButton />}
      </nav>
    </header>
  );

  function SignInButton() {
    return (
      <form
        action={async () => {
          "use server";
          await signIn();
        }}
      >
        <Button type="submit">Sign in</Button>
      </form>
    );
  }
}
