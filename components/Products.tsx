import { getProducts } from "@/actions/productActions";
import ProductCard from "./ProductCard";
import { ProductsFiltersProps } from "@/app/products/page";
import { productCountString } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function Products({ searchParams }: ProductsFiltersProps) {
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const filters = {
    q: searchParams?.q,
    sort: searchParams?.sort,
    categories: searchParams?.category
      ? searchParams.category.split(",")
      : undefined,
    minPrice: searchParams?.minPrice,
    maxPrice: searchParams?.maxPrice,
    page,
  };

  const { productList: products, total, limit } = await getProducts(filters);
  const totalPages = Math.ceil(total / limit);

  function constructUrl(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `/products?${params.toString()}`;
  }

  return (
    <>
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">
          {!searchParams || !searchParams.q
            ? `Products`
            : `Results for: "${searchParams.q}"`}
        </h1>
        <span className="text-sm text-muted-foreground">
          {productCountString(total)}
        </span>
      </header>
      <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <li key={product.id} className="border">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <Pagination className="my-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={constructUrl(page - 1)}
              aria-disabled={page <= 1}
              tabIndex={page <= 1 ? -1 : undefined}
              className={
                page <= 1 ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink href={constructUrl(p)} isActive={p === page}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={constructUrl(page + 1)}
              aria-disabled={page >= totalPages}
              tabIndex={page >= totalPages ? -1 : undefined}
              className={
                page >= totalPages
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
