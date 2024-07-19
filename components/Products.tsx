import { getProducts } from "@/actions/productActions";
import ProductCard from "./ProductCard";

export default async function Products() {
  const products = await getProducts();
  return (
    <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {products.map((product) => (
        <li key={product.id} className="border">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
