import { getProducts } from "@/actions/productActions";
import ProductCard from "./ProductCard";
import { ProductsFiltersProps } from "@/app/products/page";

export default async function Products({ searchParams }: ProductsFiltersProps) {
  const filters = {
    q: searchParams?.q,
    sort: searchParams?.sort,
    categories: searchParams?.category
      ? searchParams.category.split(",")
      : undefined,
    minPrice: searchParams?.minPrice,
    maxPrice: searchParams?.maxPrice,
  };
  const products = await getProducts(filters);

  return (
    <>
      <header className="mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">
          {!searchParams || !searchParams.q
            ? `Products`
            : `Results for: "${searchParams.q}"`}
        </h1>
        <span className="text-sm text-muted-foreground">{products.length} Products</span>
      </header>
      <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <li key={product.id} className="border">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </>
  );
}
