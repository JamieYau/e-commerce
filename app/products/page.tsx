import { getProducts } from "@/actions/productActions";
import ProductCard from "@/components/ProductCard";

export default async function page() {
  const products = await getProducts();
  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-between">
      <h1>All Products</h1>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <li key={product.id} className="border">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </main>
  );
}
