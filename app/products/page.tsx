import Products from "@/components/Products";
import { Suspense } from "react";
import Loading from "@/components/ProductsLoading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import ProductFilters from "@/components/ProductFilters";
import SortSelect from "@/components/SortSelect";

export interface ProductsFiltersProps {
  searchParams?: {
    sort?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export default function ProductsPage({ searchParams }: ProductsFiltersProps) {
  return (
    <div className="flex w-full max-w-7xl flex-1 flex-col p-2 sm:px-8">
      <Breadcrumb>
        <BreadcrumbList className="gap-1">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col lg:grid lg:grid-cols-10 lg:gap-4">
        <div className="flex h-full w-full flex-col gap-2 pt-4 lg:col-span-2">
          <h2 className="hidden font-semibold lg:block">Filters</h2>
          <div className="flex justify-end gap-4 lg:flex-col-reverse">
            <ProductFilters />
            <SortSelect />
          </div>
        </div>
        <div className="mx-auto w-full max-w-7xl pt-4 lg:col-span-8">
          <Suspense fallback={<Loading />}>
            <Products searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
