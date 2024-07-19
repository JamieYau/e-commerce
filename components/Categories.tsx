import { getCategories } from "@/actions/categoryActions";
import Link from "next/link";
import CategoryCard from "./CategoryCard";

export default async function Categories() {
  const categories = await getCategories();
  return (
    <section className="w-full p-2 max-w-7xl m-auto">
      <h2 className="mb-4 text-2xl font-bold">Shop by Categories</h2>
      <Link
        href="/products"
        className="mb-6 inline-block text-blue-600 hover:text-blue-800"
      >
        Show All
      </Link>
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
