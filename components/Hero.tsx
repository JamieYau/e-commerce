import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function Hero() {
  return (
    <section className="">
      <div className="relative aspect-[2/1] min-h-[450px] w-full">
        <Image
          src={"/images/hero-2.jpg"}
          alt="hero"
          fill
          className="-z-10 object-cover"
        />
        <div className="pl-4 pt-4">
          <h1 className="text-4xl font-bold">Welcome to TechWave</h1>
          <p className="mb-6 text-lg font-semibold">
            Explore the best fictional products for your imagination!
          </p>
          <p className="mb-6 text-sm font-semibold text-muted-foreground">
            Please note: This is a demo site and no actual products are for
            sale.
          </p>
          <Link
            href="/products"
            className={buttonVariants({ variant: "default" })}
          >
            Browse Products
          </Link>
        </div>
      </div>
    </section>
  );
}
