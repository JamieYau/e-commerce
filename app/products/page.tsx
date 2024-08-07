import Products from "@/components/Products";
import { Suspense } from "react";
import Loading from "@/components/ProductsLoading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ProductFilters from "@/components/ProductFilters";

const SORT_OPTIONS = [
  { name: "Price (Low to High)", value: "price-asc" },
  { name: "Price (High to Low)", value: "price-desc" },
  { name: "Newest", value: "newest" },
  { name: "Popularity", value: "popularity" },
  { name: "Rating", value: "rating" },
] as const;

export interface ProductsFiltersProps {
  searchParams?: {
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
          <h2 className="font-semibold">Filters</h2>
          <div className="flex gap-4 lg:flex-col">
            <Select>
              <SelectTrigger className="max-w-44 lg:flex">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ProductFilters />
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
