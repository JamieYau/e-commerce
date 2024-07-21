import { getRecommendedProducts } from "@/actions/productActions";
import { Product } from "@/types/db";
import ProductCard from "./ProductCard";

type RecommendedProps = {
  product: Product;
};

export default async function Recommended({ product }: RecommendedProps) {
  const recommendedProducts = await getRecommendedProducts(product.id);
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-bold">Recommended Products</h2>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {recommendedProducts.map((recProduct) => (
          <li key={recProduct.id} className="border">
            <ProductCard product={recProduct} />
          </li>
        ))}
      </ul>
    </section>
  );
}
