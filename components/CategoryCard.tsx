import { Category } from "@/types/db";
import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
  category: Category;
};
export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href="/products" className="flex h-full flex-col justify-between rounded-lg bg-white p-4 shadow-md">
      <h3 className="mb-2 text-lg font-semibold">{category.name}</h3>
      {category.imageUrl && (
        <Image
          src={category.imageUrl}
          alt={category.name}
          className="mb-2 h-40 w-full rounded object-cover"
        />
      )}
      <p className="text-sm text-gray-600">{category.description}</p>
    </Link>
  );
}
