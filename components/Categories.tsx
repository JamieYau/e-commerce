import { getCategories } from "@/actions/categoryActions";
import Link from "next/link";
import CategoryCard from "./CategoryCard";

export default async function Categories() {
  const categories = await getCategories();
  return (
    <section className="m-auto my-8 w-full p-2 sm:p-8">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-2xl font-bold">Shop by Categories</h2>
        <Link
          href="/products"
          className="underline underline-offset-2"
        >
          Show All
        </Link>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
}
