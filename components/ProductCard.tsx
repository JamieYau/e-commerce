import { ProductWithRating } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import StarRating from "./StarRating";

interface ProductCardProps {
  product: ProductWithRating;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="flex flex-col">
      <AspectRatio ratio={4 / 3} className="w-full">
        <Image
          src={product.imageUrl || "/images/placeholder.png"}
          alt={product.name}
          fill
          sizes="(min-width: 1380px) 290px, (min-width: 780px) calc(22.93vw - 22px), (min-width: 640px) calc(50vw - 58px), calc(50vw - 42px)"
          className="object-cover"
        />
      </AspectRatio>
      <div className="p-2">
        <h3 className="font-bold">{product.name}</h3>
        <div className="mb-2 flex gap-1">
          <StarRating rating={product.avgRating} />
          <span className="text-muted-foreground">({product.reviewCount})</span>
        </div>
        <p>£{product.price}</p>
      </div>
    </Link>
  );
}
