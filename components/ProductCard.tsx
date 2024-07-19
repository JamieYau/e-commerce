import { Product } from "@/types/db";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={product.id} className="flex flex-col gap-2">
      <Image
        src={product.imageUrl || ""}
        alt={product.name}
        width={400}
        height={200}
      />
      <h3 className="font-bold">{product.name}</h3>
      <p className="font-light text-sm">{product.description}</p>
      <p>£{product.price}</p>
    </Link>
  );
}
