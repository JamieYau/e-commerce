import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function Hero() {
  return (
    <section>
      <div className="relative m-auto flex aspect-[5/2] min-h-[450px] w-full items-center bg-zinc-100">
        <Image
          src={"/images/hero-1.png"}
          alt="hero"
          fill
          sizes="(min-width: 1400px) 1280px, 93.7vw"
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
        <div className="relative z-10 ml-4 mr-auto sm:ml-28">
          <h1 className="max-w-72 text-5xl font-bold">Shop at TechWave</h1>
          <p className="my-4 text-lg font-medium">Explore best tech products</p>
          <p className="mb-10 max-w-52 text-sm font-semibold text-muted-foreground">
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
