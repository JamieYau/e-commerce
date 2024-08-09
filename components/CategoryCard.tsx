import { Category } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type CategoryCardProps = {
  category: Category;
};
export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${category.id}`}
      className="flex h-full flex-col justify-between rounded-lg bg-white p-4 shadow-md"
    >
      <h3 className="mb-2 text-lg font-semibold">{category.name}</h3>
      {category.imageUrl && (
        <AspectRatio ratio={4 / 3}>
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            className="mb-2 h-40 w-full rounded object-cover"
          />
        </AspectRatio>
      )}
      <p className="text-sm text-gray-600">{category.description}</p>
    </Link>
  );
}
