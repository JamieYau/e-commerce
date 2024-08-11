import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import CartPreview from "./CartPreview";

export default function BurgerMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" className="relative p-2">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"top"} className="h-min w-full">
        <SheetHeader>
          <SheetTitle>Links</SheetTitle>
          <SheetDescription className="hidden">
            Hamburger menu containing website links
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col">
          <SheetClose asChild>
            <Link href={"/"} className={buttonVariants({ variant: "ghost" })}>
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/products"}
              className={buttonVariants({ variant: "ghost" })}
            >
              Shop
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <CartPreview />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
