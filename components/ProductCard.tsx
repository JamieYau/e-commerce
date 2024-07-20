import { Product } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`products/${product.id}`} className="flex flex-col gap-2">
      <AspectRatio ratio={4 / 3} className="w-full">
        <Image
          src={product.imageUrl || "/images/placeholder.png"}
          alt={product.name}
          fill
          sizes="(min-width: 1400px) 414px, (min-width: 780px) 29.5vw, (min-width: 640px) calc(50vw - 26px), calc(100vw - 34px)"
          className="object-cover"
        />
      </AspectRatio>
      <h3 className="font-bold">{product.name}</h3>
      <p className="text-sm font-light">{product.description}</p>
      <p>£{product.price}</p>
    </Link>
  );
}
