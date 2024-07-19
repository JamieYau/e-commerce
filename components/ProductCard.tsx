import { Product } from "@/types/db";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={product.id} className="flex flex-col gap-2">
      <div className="relative w-full pt-[75%]">
        <Image
          src={product.imageUrl || "/images/placeholder.png"}
          alt={product.name}
          fill
          sizes="(min-width: 1400px) 414px, (min-width: 780px) 29.5vw, (min-width: 640px) calc(50vw - 26px), calc(100vw - 34px)"
          className="object-cover"
        />
      </div>
      <h3 className="font-bold">{product.name}</h3>
      <p className="text-sm font-light">{product.description}</p>
      <p>£{product.price}</p>
    </Link>
  );
}
